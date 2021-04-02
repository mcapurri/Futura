const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// @desc      Check logged in user
// @route     GET /api/auth/loggedin
// @access    Public
router.get('/loggedin', (req, res, next) => {
    console.log('logged in user: ', req.user);
    // this is where passport stores the logged in user
    res.json(req.user);
});

// @desc      Log in
// @route     POST /api/auth//login
// @access    Public
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', (err, user) => {
//         if (err) {
//             return res
//                 .status(500)
//                 .json({ message: 'Error while attempting to login' });
//         }
//         if (!user) {
//             return res.status(400).json({ message: 'Wrong credentials' });
//         }
//         req.login(user, (err) => {
//             if (err) {
//                 return res
//                     .status(500)
//                     .json({ message: 'Error while attempting to login' });
//             }
//             return res.status(200).json(user);
//         });
//     })(req, res);
// });

router.post('/login', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user,
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            } // generate a signed son web token with the contents of user object and return it in the response
            const token = user.getSignedJwtToken();
            return res.json({ user, token });
        });
    })(req, res);
});

// @desc      Sign up
// @route     POST /api/auth//signup
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
// @route     POST /api/auth/forgotpassword
// @access    Public
router.post('/forgotpassword', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            console.log('userDb', user);
            if (!user) {
                res.status(403).json("User doesn't exist");
            } else {
                // Get reset token
                const resetToken = user.getResetPasswordToken();
                // Create reset url
                const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
                const message = `We received a request to reset your password for your account. We're here to help!<br/>Simply click the link below to reset your password:<br/> \n\n ${resetUrl}
                
                If you didn't ask any changes, please ignore this email`;
                user.sendEmail({
                    email: user.email,
                    subject: 'Reset account password',
                    message,
                });
            }
        })
        .then(() => {
            res.status(200).json('Password Reset Email Successfully Sent!');
        })
        .catch((err) => next(err));
});

// @desc      Reset password
// @route     PUT /api/auth/resetpassword/:resettoken
// @access    Public
router.put('/resetpassword/:resettoken', async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        getResetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(err);
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    user.sendTokenResponse(user, 200, res);
});

// @desc      Log out
// @route     DELETE /logout
// @access    Private
router.delete('/logout', (req, res) => {
    // passport method to log out
    req.logout();
    res.status(200).json('Logout was successful');
});

module.exports = router;
