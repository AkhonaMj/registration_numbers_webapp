export default function RegistrationDb(db) {

    async function addRegNum(regNum) {
        let townTag = regNum.slice(0, 2);
        // //console.log('townTag: ' + townTag);
        let townId = await db.oneOrNone("SELECT id FROM towns_table WHERE town_code = $1", [townTag]);

        // //console.log('townId.id: ' + townId.id);
        return await db.oneOrNone("INSERT INTO registration (reg_number,town_id) VALUES ($1,$2) ON CONFLICT DO NOTHING", [regNum, townId.id]);
    }


    async function getRegNums() {
        return await db.manyOrNone("SELECT reg_number FROM registration");
    }

    async function filteredRegNums(townCode) {
        // //console.log(townCode + "swewewewewe")
        if (!townCode) {
            return getRegNums()
        }
        let townId = await db.oneOrNone("SELECT id FROM towns_table WHERE town_code = $1", [townCode]);
        // //console.log(townId);

        if (typeof townCode === 'string' || townCode instanceof String) {
            let filterReg = await db.manyOrNone("SELECT * FROM registration WHERE town_id = $1", [townId.id]);
            ////console.log(filterReg);
            return filterReg
        }
        // } else {
        //     return await db.manyOrNone("SELECT * FROM towns_table");
        // }
    }

    async function existingReg(regNum) {

        var regAvailable = await db.oneOrNone("SELECT reg_number FROM registration WHERE reg_number = $1", [regNum]);
        return regAvailable;

    }

    async function resetReg() {
        await db.any("DELETE FROM registration");
    }

    return {
        addRegNum,
        getRegNums,
        existingReg,
        resetReg,
        filteredRegNums,

    }

}