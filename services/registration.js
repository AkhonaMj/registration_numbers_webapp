export default function Registration(RegistrationDb) {

    function validReg(regNum) {

        const validRegex =/^(CA|CL|CJ|CF)\s?\d{1,3}(\s?|-)\d{1,3}$/i
        if (regNum == "") {
            return false
        } else if (regNum.length > 11) {
            return false;
        } else if (regNum.length < 5) {
            return false
        } else if (!validRegex.test(regNum)) {
            return false
        } else {
            return true
        }
    }

    function getTownCode(regNum) {
        var townCode = regNum.replace(/[^a-z]/gi, '');
        return townCode
    }

    function invalidReg() {
        return "Please enter a valid registration number"

    }

    return {
        validReg,
        invalidReg,
        getTownCode

    }
}