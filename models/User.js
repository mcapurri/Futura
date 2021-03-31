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
    },
    {
        timestamps: true,
    }
);
const User = model('User', userSchema);

module.exports = User;
