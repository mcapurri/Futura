const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        address: {
            street: String,
            zipCode: String,
            city: String,
            state: String,
        },

        phoneNumber: String,
        balance: {
            type: Number,
            default: 0,
        },
        totalDeposited: {
            type: Number,
            default: 0,
        },
        avatar: String,
        role: {
            type: String,
            enum: ['Admin', 'User'],
            default: 'User',
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Generate and hash password token
userSchema.methods.getResetPasswordToken = async function (user) {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire
    resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    return resetPasswordToken;
};

userSchema.methods.sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // send mail with defined transport object
    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

// Get token from model, create cookie and send response
// userSchema.methods.sendTokenResponse = (user, statusCode, res) => {
//     console.log('sendtokenResponse running');

//     // Create token
//     const token = user.getSignedJwtToken(user);

//     // Save token in a cookie

//     const options = {
//         expires: new Date(
//             Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//         ),
//         httpOnly: true,
//     };
//     if (process.env.NODE_ENV === 'production') {
//         options.secure = true;
//     }
//     res.status(statusCode).cookie('token', token, options).json({
//         token,
//         message: 'Password Successfully Updated',
//     });
//     return token;
// };

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function (user) {
    let temp = user || this;
    console.log('getSignedToken running');
    return jwt.sign(
        { email: temp.email, _id: temp._id, role: temp.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        }
    );
};

const User = model('User', userSchema);

module.exports = User;
