const router = require('express').Router();
const Deposit = require('../models/Deposit');
const User = require('../models/User');

/// @desc     Get all own deposits
// @route     GET /api/deposits
// @access    Private
router.get('/:id', async (req, res, next) => {
    const deposits = await Deposit.find({ depositedBy: req.params.id });
    console.log('deposits', deposits);
    res.status(200).json(deposits);
});

/// @desc     Add deposit
// @route     POST /api/deposits/add
// @access    Private
router.post('/add', async (req, res, next) => {
    const { location, email, deposited, credit } = req.body;
    // console.log('req.body', req.body);
    try {
        const user = await User.findOneAndUpdate(
            {
                email: email,
            },

            {
                $inc: {
                    'user.totalDeposited': deposited,
                    'user.balance': credit,
                },
            }
        );
        console.log('user', user);
        // const addDeposit = await Deposit.create({
        //     location,
        //     deposited,
        //     credit,
        //     depositedBy: user,
        // });
        // console.log('addDeposit', addDeposit);

        // if (user) {
        //     try {
        //         const addDeposit = await Deposit.create({
        //             location,
        //             kgDeposited,
        //             credit,
        //             depositedBy: user,
        //         });
        //         console.log('addDeposit', addDeposit);
        //         res.status(201).json({ message: 'Deposit successfully added' });
        //     } catch (err) {
        //         res.status(400).json({ message: 'Error in adding deposit' });
        //     }
        // } else {
        //     return res.status(400).json({ message: "User doesn't exist" });
        // }
    } catch (err) {
        return res.status(400).json({ message: "User doesn't exist" });
    }
});

module.exports = router;
