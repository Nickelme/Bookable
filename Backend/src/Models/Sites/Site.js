const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: true
    },

    sitePhysicalAddress: {
        type: String,
        required: true,
    },

    usesHomeAssistant: {
        type: Boolean,
        required: true,
        default: false
    },

    haUrl: {
        type: String,
        required: false,
    },

    haLongLivedToken: {
        type: String,
        required: false,
    },

    usesUnifi: {
        type: Boolean,
        required: true,
        default: false
    },

    unifiUrl: {
        type: String,
        required: false,
    },

    unifiUsername: {
        type: String,
        required: false
    },

    unifiPassword: {
        type: String,
        required: false
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

    // globalLocks: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Lock",
    //     validate: {
    //         validator: async function (v) {
    //             try {
    //                 let roomCount = await mongoose.model('Lock').countDocuments({ _id: v });
    //                 if (roomCount > 0) return true;
    //                 return false;
    //             } catch (e) {
    //                 console.log(e);
    //                 return false;
    //             }
    //         },
    //         message: "Could not lock"
    //     }
    // }],

    

    
}, { timestamps: true });

const Site = mongoose.model('Site', SiteSchema);

module.exports = Site;