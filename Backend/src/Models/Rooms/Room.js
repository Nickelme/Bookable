const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({

    roomName: {
        type: String,
        required: true
    },

    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
        required: true,
        validate: {
            validator: async function (v) {
                try {
                    let siteCount = await mongoose.model('Site').countDocuments({ _id: v });
                    if (siteCount > 0) return true;
                    return false;
                } catch (e) {
                    console.log(e);
                    return false;
                }
            },
            message: "Could not find Lock"
        }
    },

    locks: [
        {
            type: mongoose.Schema.Types.ObjectId,
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
    ]

}, { timestamps: true });

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;