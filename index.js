import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config()
import pgPromise from "pg-promise";
import RegistrationDb from "./services/reg_database.js";
import Registration from "./services/registration.js";
import RegRoutes from "./routes/regRoutes.js";
const pgp = pgPromise();
const app = express();

const exphbs = engine({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts'

})

const db = pgp({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
});

const registrationInst = Registration();
const registrationDb = RegistrationDb(db, registrationInst)

app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());


const regRoutesInst = RegRoutes(registrationInst, registrationDb)

app.get('/', regRoutesInst.home);

// app.get('/reg_numbers', )
 app.post('/filter', regRoutesInst.filterRegs)

app.post('/add', regRoutesInst.add)
app.post('/reset', regRoutesInst.reset)



const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});