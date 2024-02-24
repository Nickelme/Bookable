const express = require('express');
const router = express.Router();
const jwtHelper = require('../../Utils/JWTToken');
const Room = require("../../Models/Rooms/Room");
const haManager = require("../../Services/HomeAssistant/HomeAssistantManager");

router.get("/list", jwtHelper.authenticateToken, async (req, res) => {
    const rooms = await Room.find({});
    let roomList = [];
    for (var i = 0; i < rooms.length; i++){
        if (rooms[i].locks.length < 1) {
            delete rooms[i]._doc.locks;
        }
        roomList[i] = structuredClone(rooms[i]._doc);
        roomList[i]._id = rooms[i]._id.toString();
    }


    res.status(200).json({ success: true, "rooms": roomList });
});

module.exports = router;