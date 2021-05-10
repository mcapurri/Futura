const { Schema, model } = require('mongoose');

const depositSchema = new Schema(
    {
        location: String,
        kgDeposited: Number,
        credit: Number,
        depositedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
);
const Deposit = model('Deposit', depositSchema);

module.exports = Deposit;
