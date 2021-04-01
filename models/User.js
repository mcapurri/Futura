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
        avatar: String,
    },
    {
        timestamps: true,
    }
);

const crypto = require('crypto');
// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire
    resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const nodemailer = require('nodemailer');
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

const User = model('User', userSchema);

module.exports = User;
