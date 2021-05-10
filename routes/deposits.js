const router = require('express').Router();
const Deposit = require('../models/Deposit');
const User = require('../models/User');

/// @desc     Add deposit
// @route     POST /api/deposits/add
// @access    Private
router.post('/add', async (req, res, next) => {
    const { location, email, kgDeposited, credit } = req.body;
    console.log('req.body', req.body);

    const user = await User.findOneAndUpdate(
        {
            email: email,
        },
        {
            totalDeposited: user.totalDeposited + kgDeposited,
            balance: user.balance + credit,
        }
    );
    console.log('user', user);

    if (user) {
        try {
            const addDeposit = await Deposit.create({
                location,
                kgDeposited,
                credit,
                depositedBy: user,
            });
            res.status(201).json({ message: 'Deposit successfully added' });
        } catch (err) {
            res.status(400).json({ message: 'Error in adding deposit' });
        }
    } else {
        return res.status(400).json({ message: "User doesn't exist" });
    }
});

module.exports = router;
