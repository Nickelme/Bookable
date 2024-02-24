const mongoose = require('mongoose');

const LockSchema = new mongoose.Schema({

    lockName: {
        type: String,
        required: true
    },

    deviceId: {
        type: String,
        required: true,
    },

    batteryEntityId: {
        type: String,
        required: true
    },

    battery:{
        type: Number,
        default: 0
    },

    lockEntityId:{
        type: String,
        required: true
    },

    lockState: {
        type: String,
        default: "Unknown"
    },

    lockCodes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LockCode",
            validate: {
                validator: async function (v) {
                    try {
                        let lockCountCount = await mongoose.model('LockCode').countDocuments({ _id: v });
                        if (lockCountCount > 0) return true;
                        return false;
                    } catch (e) {
                        console.log(e);
                        return false;
                    }
                },
                message: "Could not find LockCode"
            }
        }
    ]

}, { timestamps: true });

const Lock = mongoose.model('Lock', LockSchema);

module.exports = Lock;