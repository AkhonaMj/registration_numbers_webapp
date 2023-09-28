export default function RegistrationDb(db, regNumInst) {

    async function addRegNum(regNum) {
        const townCode = regNumInst.getTownCode(regNum)
        console.log(regNum)

        await db.none("INSERT INTO registration (reg_number) VALUES ($1)", [regNum]);
       // await db.none("INSERT INTO town_code (towncode) VALUES ($1)", [townCode]);

    }
    async function getRegNums() {
        
        return await db.manyOrNone("SELECT reg_number FROM registration");
    }

    async function filteredRegNums(townCode) {
        if (typeof townCode === 'string' || townCode instanceof String) {
            return await db.manyOrNone("SELECT * FROM town_code WHERE id = $1", [townCode]);

        } else {
            return await db.manyOrNone("SELECT * FROM town_code");

        }
    }

    async function existingReg(regNum) {

        var regAvailable = await db.oneOrNone("SELECT reg_number FROM registration WHERE reg_number = $1", [regNum]);
        return regAvailable

    }

    async function resetReg() {
        await db.any("DELETE FROM registration");
        await db.any("DELETE FROM town_code");

    }
    return {
        addRegNum,
        getRegNums,
        existingReg,
        resetReg,
        filteredRegNums,

    }

}