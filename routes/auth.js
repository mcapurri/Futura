const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// @desc      Check logged in user
// @route     GET /loggedin
// @access    Public
router.get('/loggedin', (req, res, next) => {
    console.log('logged in user: ', req.user);
    // this is where passport stores the logged in user
    res.json(req.user);
});

// @desc      Log in
// @route     POST /login
// @access    Public
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return res
                .status(500)
                .json({ message: 'Error while attempting to login' });
        }
        if (!user) {
            return res.status(400).json({ message: 'Wrong credentials' });
        }
        req.login(user, (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Error while attempting to login' });
            }
            return res.status(200).json(user);
        });
    })(req, res);
});

// @desc      Sign up
// @route     POST /signup
// @access    Public
router.post('/signup', (req, res, next) => {
    console.log('req.body', req.body);
    const {
        firstName,
        lastName,
        email,
        password,
        confirm,
        street,
        zipCode,
        city,
        state,
        phoneNumber,
    } = req.body;

    if (password.length < 3) {
        return res
            .status(400)
            .json({ message: 'Your password must be 8 chars minimum' });
    }
    if (password !== confirm) {
        return res.status(400).json({ message: "Passwords don't match" });
    }

    User.findOne({ email }).then((found) => {
        if (found) {
            return res.status(400).json({ message: 'This user already exist' });
        } else {
            // we can create a user with the username and password pair
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);

            User.create({
                firstName,
                lastName,
                email,
                password: hash,
                address: { street, zipCode, city, state },
                phoneNumber,
            })
                .then((dbUser) => {
                    // login with passport:
                    req.login(dbUser, (err) => {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error while attempting to login',
                            });
                        }
                        return res.status(200).json(dbUser);
                    });
                })
                .catch((err) => {
                    res.json(err);
                });
        }
    });
});

// @desc      Forgot Password
// @route     POST /forgotPassord
// @access    Public
router.post('/forgotPassword', (req, res, next) => {
    console.log('req.body', req.body.email);
    // const { email } = req.body;
    // console.log('email', email);
    User.findOne({ email: req.body.email })
        .then((user) => {
            console.log('userDb', user);
            if (!user) {
                res.status(403).json("User doesn't exist");
            } else {
                // Get reset token
                const resetToken = user.getResetPasswordToken();
                // Create reset url
                const resetUrl = `${req.protocol}://${req.get(
                    'host'
                )}/api/auth/resetpassword/${resetToken}`;
                const message = `You are receiving this email because you (or someone else) has requested the reset of the password. Please make a PUT request to: \n\n ${resetUrl}`;
                user.sendEmail({
                    email: user.email,
                    subject: 'Password reset token',
                    message,
                });
            }
        })
        .then(() => {
            res.status(200).json('Email sent');
        })
        .catch((err) => next(err));
});

// @desc      Log out
// @route     DELETE /logout
// @access    Private
router.delete('/logout', (req, res) => {
    // passport method to log out
    req.logout();
    res.status(200).json({ message: 'Logout was successful' });
});

module.exports = router;
