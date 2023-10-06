export default function RegistrationDb(db) {

    async function townId(townTag) {
        return await db.oneOrNone("SELECT id FROM towns_table WHERE town_code = $1", [townTag]);
    }

    async function addRegNum(regNum) {
        const townIdValue = await townId(regNum.slice(0, 2));
        if (regNum == "") {
            return "Enter registration number"
        }
        else if(townIdValue == null){
            return "Invalid registration town code"

        }
        else if (regNum.length > 10) {
            return "Registration number is too long!";

        }
        else {
            return await db.oneOrNone("INSERT INTO registration (reg_number, town_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [regNum, townIdValue ? townIdValue.id : null]);
        }
    }

    async function getRegNums() {
        return await db.manyOrNone("SELECT reg_number FROM registration");
    }

    async function filteredRegNums(townCode) {
        if (!townCode) {
            return getRegNums();
        } else {
            const townIdValue = await townId(townCode);
            if (townIdValue) {
                return await db.manyOrNone("SELECT * FROM registration WHERE town_id = $1", [townIdValue.id]);
            }
        }
    }

    async function existingReg(regNum) {
        const regAvailable = await db.oneOrNone("SELECT reg_number FROM registration WHERE reg_number = $1", [regNum]);
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
