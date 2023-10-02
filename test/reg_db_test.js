import assert from "assert";
import RegistrationDb from "../services/reg_database.js";
import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config()

const pgp = pgPromise();
const connectionString = process.env.CONNECTION_STRING
const db = pgp(connectionString);



describe("Registration webapp", function () {
    const registration = RegistrationDb(db);



    this.timeout(5000);

    beforeEach(async function () {
        await db.none("TRUNCATE TABLE registration");
        await db.none("TRUNCATE TABLE towns_table");
    });

    describe("addRegNum", async function () {
        it("should be able to add registration numbers", async function () {
            const reg_number = "CA 3443"
            await registration.addRegNum(regNum)
            assert.deepEqual([{ "CA 3443": reg_number }], await registration.getRegNums())
        });

    });

});