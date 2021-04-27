const { Schema, model } = require('mongoose');

const dropOffSchema = new Schema(
    {
        name: String,
        street: String,
        houseNumber: String,
        zipCode: String,
        city: String,
        lngLat: [String],
        openingTime: String,
        closingTime: String,
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
);
const DropOff = model('DropOff', dropOffSchema);

module.exports = DropOff;
