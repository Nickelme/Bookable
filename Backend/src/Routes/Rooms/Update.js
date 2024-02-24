const express = require('express');
const router = express.Router();
const jwtHelper = require('../../Utils/JWTToken');
const Room = require("../../Models/Rooms/Room");

router.patch("/:id", jwtHelper.authenticateToken, async (req, res) => {
    try{
        const dbRes = await Room.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({success: true, room: dbRes});
    }catch (err){
        console.log(err);
        res.status(500).json({success: false});
    }
});

module.exports = router;