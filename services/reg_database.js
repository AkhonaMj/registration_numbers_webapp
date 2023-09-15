export default function RegistrationDb(db, regNumInst) {

    async function addRegNum(regNum) {
        const townCode = regNumInst.getTownCode(regNum)
        console.log(townCode);
        await db.none("INSERT INTO dev.registration (reg_number,  towncode) VALUES ($1, $2)", [regNum, townCode])
    }
    async function getRegNums() {
        return await db.manyOrNone("SELECT reg_number FROM dev.registration");
    }

    async function filteredRegNums(townCode) {
        if (typeof townCode === 'string' || townCode instanceof String) {
            return await db.manyOrNone("SELECT * FROM dev.registration WHERE towncode = $1", [townCode]);

        } else {
            return await db.manyOrNone("SELECT * FROM dev.registration");

        }
    }

    async function existingReg(regNum) {

        var regAvailable = await db.oneOrNone("SELECT reg_number FROM dev.registration WHERE reg_number = $1", [regNum]);
        return regAvailable

    }

    async function resetReg() {
        await db.any("DELETE FROM dev.registration");

    }
    return {
        addRegNum,
        getRegNums,
        existingReg,
        resetReg,
        filteredRegNums,

    }

}