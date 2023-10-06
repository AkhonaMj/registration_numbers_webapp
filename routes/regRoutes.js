export default function RegRoutes(registrationInst, registrationDb) {

    async function home(req, res) {

        const errorMsg = req.flash('error')[0];
        //  const successMsg = req.flash('success')[0];
        const filteredRegs = await registrationDb.filteredRegNums(req.flash('regByTown')[0]);
        const successMsg = req.flash('success')[0];
        // console.log(filteredRegs)
        //  const regNums = await registrationDb.getRegNums();


        res.render('index', {
            // displaying  registrations
            filteredRegs,

            //displaying error messages
            errorMsg,

            successMsg



        });
    }

    async function registration(req, res) {
        await registrationDb.addRegNum()
        await registrationDb.filteredRegNums(req.body.townCode);
        res.redirect('/')
    }

    async function add(req, res) {
        var regNum = (req.body.regNum).toUpperCase().trim();
        if (regNum == "") {
            req.flash('error', "Registration empty!")
        }
        if (await registrationDb.existingReg(regNum)) {
            !registrationDb.addRegNum(regNum)
            req.flash('error', "This registration already exists!")
        }
        if (!registrationInst.validReg(regNum)) {
            req.flash('error', "Enter registration from CA, CJ, CL, CF")
        }
        else if (registrationInst.validReg(regNum)) {
            await registrationDb.addRegNum(regNum)
            // return req.flash('success', "Registration successfully added!")
        }
        res.redirect('/')

    }
    async function showAll(req, res) {
        await registrationDb.getRegNums();
        res.redirect('/')
    }
    async function reset(req, res) {
        await registrationDb.resetReg()
        req.flash('success', 'Registrations cleared successfully!')
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
        filterRegs,
        showAll
    }
}