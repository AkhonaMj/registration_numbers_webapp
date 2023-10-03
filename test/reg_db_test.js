import assert from "assert";
import RegistrationDb from "../services/reg_database.js";
import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config()

const pgp = pgPromise();
const connectionString = process.env.CONNECTION_STRING
const db = pgp(connectionString);



describe("Registration webapp", function () {

 // creating an instance for the database factory function
    const registration = RegistrationDb(db);

//setting a timeout for each test case to  (5 seconds).
    this.timeout(5000);

// empting the table before each test case
    beforeEach(async function () {
        await db.none("TRUNCATE TABLE registration");
     
    });


    describe("addRegNum", async function () {
        it("should be able to add registration numbers", async function () {
            const registration = RegistrationDb(db);
            const regNum = "CA 3443"
            await registration.addRegNum(regNum)
            assert.deepEqual([{ reg_number: 'CA 3443' }], await registration.getRegNums())

        });

        // describe("filterRegNums", async function(){
        //     it("Should be able to filter reg numbers by town", async function(){
        //         await  registration.addRegNum("CA 1234");
        //         await  registration.addRegNum("CL 228-384");
        //         await  registration.addRegNum("CA 3534");
        //         await  registration.addRegNum("CF 1234");
        //         assert.deepEqual([{}])
        //     })

     //   })
       
    });

});