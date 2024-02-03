const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: true
    },

    sitePhysicalAddress: {
        type: String,
        required: true,
    },

    haUrl: {
        type: String,
        required: true,
    },

    haLongLivedtoken: {
        type: String,
        required: true,
    },

    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        validate: {
            validator: async function (v) {
                try {
                    let roomCount = await mongoose.model('Room').countDocuments({ _id: v });
                    if (roomCount > 0) return true;
                    return false;
                } catch (e) {
                    console.log(e);
                    return false;
                }
            },
            message: "Could not find Room"
        }
    }],

    globalLocks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "LockCode",
        validate: {
            validator: async function (v) {
                try {
                    let roomCount = await mongoose.model('Room').countDocuments({ _id: v });
                    if (roomCount > 0) return true;
                    return false;
                } catch (e) {
                    console.log(e);
                    return false;
                }
            },
            message: "Could not find Room"
        }
    }],

    

    
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;