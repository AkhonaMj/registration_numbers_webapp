export default function RegRoutes(registrationInst, registrationDb) {

    async function home(req, res) {
        var storeRegs = await registrationDb.getRegNums()
        var filteredRegs = await registrationDb.filteredRegNums()

        res.render('index', {
            regNums: storeRegs,
            filterRegs: filteredRegs

        });
    }

    async function registration(req, res) {
        await registrationDb.addRegNum()
        registrationDb.filteredRegNums(req.body.towns);

        res.redirect('/')
    }
    async function add(req, res) {
        var regNum = (req.body.regNum).toUpperCase().trim();
        if (await registrationDb.existingReg(regNum)) {
            req.flash('error', "This registration already exists!")
        }
        else if (registrationInst.validReg(regNum)) {
            await registrationDb.addRegNum(regNum)
        }
        res.redirect('/')

    }
    async function reset(req, res) {
        await registrationDb.resetReg()
        res.redirect('/')
    }

    async function filterRegs(req, res) {
        await registrationDb.filteredRegNums(req.body.townCode)
        res.redirect('/')
    }
    return {
        home,
        registration,
        add,
        reset,
        filterRegs
    }
}