const mongoose = require('mongoose');

const LockSchema = new mongoose.Schema({

    lockCodeName: {
        type: String,
        required: true
    },

    lockCodeNumber: {
        type: Number,
        required: true
    },

    currentLockCode: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[0-9]{4,8}$/.test(v);
            }
        }
    },

    parentLock: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Lock",
        validate: {
            validator: async function (v) {
                try {
                    let lockCount = await mongoose.model('Lock').countDocuments({ _id: v });
                    if (lockCount > 0) return true;
                    return false;
                } catch (e) {
                    console.log(e);
                    return false;
                }
            },
            message: "Could not find Lock"
        }
    }



}, { timestamps: true });

const Lock = mongoose.model('Lock', LockSchema);

module.exports = Lock;