import assert from "assert";
import RegistrationDb from "../services/reg_database.js";
import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config()

const pgp = pgPromise();
const connectionString = process.env.CONNECTION_STRING
const db = pgp(connectionString);



describe("Registration webapp", async function () {

    // creating an instance for the database factory function
    const registration = RegistrationDb(db);

    //setting a timeout for each test case to  (5 seconds).
    this.timeout(5000);

    // empting the table before each test case
    beforeEach(async function () {
        await db.none("TRUNCATE TABLE registration RESTART IDENTITY CASCADE");


    });


    describe("addRegNum", async function () {

        it("should be able to add registration numbers", async function () {
            const registration = RegistrationDb(db);
            await registration.addRegNum("CA 3443");
            assert.deepEqual(await registration.getRegNums(), [{ reg_number: 'CA 3443' }]);
        });

        it("should be able to add registration numbers", async function () {
            const registration = RegistrationDb(db);
            await registration.addRegNum("CF 279-563");
            assert.deepEqual(await registration.getRegNums(), [{ reg_number: 'CF 279-563' }]);
        });

        it("should be able to add registration numbers", async function () {
            const registration = RegistrationDb(db);
            await registration.addRegNum("CA 250 963");
            assert.deepEqual(await registration.getRegNums(), [{ reg_number: 'CA 250 963' }]);
        });


        it("should not be able to add registration numbers that are not from CA,CF,CL,CJ ", async function () {
            const registration = RegistrationDb(db);
            const regNum = "CEF 3443";
            await registration.addRegNum(regNum);
            assert.deepEqual(await registration.getRegNums(), []);
        });

        it("should not be able to add registration numbers that are not from CA,CF,CL,CJ ", async function () {
            const registration = RegistrationDb(db);
            const regNum = "CFM 346-574";
            await registration.addRegNum(regNum);
            assert.deepEqual(await registration.getRegNums(), []);
        });
        

        it("should not add registration numbers with characters greater than 11", async function () {
            const registration = RegistrationDb(db);
            const regNum = "CEF 34877455543";
            await registration.addRegNum(regNum);
            assert.deepEqual(await registration.getRegNums(), []);
        });
        it("should not add registration numbers with that have special charecters", async function () {
            const registration = RegistrationDb(db);
            const regNum = "CE @5543";
            await registration.addRegNum(regNum);
            assert.deepEqual(await registration.getRegNums(), []);
        });
    });


    describe("Handling duplicates", async function () {
        it("should not add existing registration numbers", async function () {
            const registration = RegistrationDb(db);
            await registration.addRegNum("CA 745-564");
            await registration.addRegNum("CA 745-564");
            await registration.addRegNum("CA 3443");
            assert.deepEqual(await registration.getRegNums(), [{ reg_number: 'CA 745-564' }, { reg_number: 'CA 3443' }])

        });
    })

    describe("filterRegNums", async function () {
        it("Should be able to filter reg numbers by town", async function () {
            const registration = RegistrationDb(db);
            await registration.addRegNum("CA 1234");
            await registration.addRegNum("CL 228-384");
            await registration.addRegNum("CA 3534");
            await registration.addRegNum("CF 1234");

            assert.deepEqual(await registration.filteredRegNums("CL"), [{ id: 2, reg_number: "CL 228-384", town_id: 3 }],)


        })

    });

    describe("resetReg", async function () {
        it("should be able to clear registration numbers", async function () {
            const registration = RegistrationDb(db);
            await registration.addRegNum("CA 3443");
            await registration.addRegNum("CA 1234");
            await registration.addRegNum("CL 228-384");
            await registration.addRegNum("CA 3534");
            await registration.addRegNum("CF 1234");
            await registration.resetReg();
            assert.deepEqual(await registration.getRegNums(), [])


        });
    });


});