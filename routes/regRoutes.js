export default function RegRoutes(registrationInst, registrationDb) {

    async function home(req, res) {
        const errorMsg = req.flash('error')[0]
        const filteredRegs = await registrationDb.filteredRegNums(req.flash('regByTown')[0])
  

            res.render('index', {
                regNums: filteredRegs,
                // filteredRegs: await registrationDb.filteredRegNums(req.body.townCode),
                errorMsg

            });
    }

    async function registration(req, res) {
        await registrationDb.addRegNum()
        await registrationDb.filteredRegNums(req.body.townCode);

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

        req.flash('regByTown', req.body.townCode)
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