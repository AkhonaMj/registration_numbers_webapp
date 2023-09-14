export default function RegRoutes(registrationInst, registrationDb) {

    async function home(req, res) {
        var storeRegs = await registrationDb.getRegNums()
        var filteredRegs = await registrationDb.filteredRegNums(req.flash('townCode')[0] || 'ZZ')

        res.render('index', {
            regNums:  filterRegs || storeRegs

        });
    }

    async function registration(req, res) {
        await registrationDb.addRegNum()
        // registrationInst.registration(req.body.towns);

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
      
        req.flash('townCode', req.body.townCode)
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