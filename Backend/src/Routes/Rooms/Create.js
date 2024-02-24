const express = require('express');
const router = express.Router();
const jwtHelper = require('../../Utils/JWTToken');
const Room = require("../../Models/Rooms/Room");
const Site = require("../../Models/Sites/Site")

router.post("/create", jwtHelper.authenticateToken, async (req, res)=>{
    try{
        const {roomName, siteId } = req.body;
        const ownerSite = await Site.findById(siteId);
        const newRoom = new Room({roomName, siteId});
        await newRoom.save();
        ownerSite.rooms.push(newRoom._id);
        await ownerSite.save();
        res.status(201).json(newRoom);
    }catch (err){
        res.status(500).json({error: err.message});
    }



});

module.exports = router;