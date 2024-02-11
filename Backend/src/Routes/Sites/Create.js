const express = require('express');
const router = express.Router();
const jwtHelper = require('../../Utils/JWTToken');
const Site = require("../../Models/Sites/Site");

router.post("/create", jwtHelper.authenticateToken, async (req, res)=>{
    try{
        const {siteName, sitePhysicalAddress, haUrl, haLongLivedToken } = req.body;
        const newSite = new Site({siteName, sitePhysicalAddress, haUrl, haLongLivedToken});
        await newSite.save();
        res.status(201).json(newSite);
    }catch (err){
        res.status(500).json({error: err.message});
    }



});

module.exports = router;