const express = require('express');
const router = express.Router();
const jwtHelper = require('../../Utils/JWTToken');
const Site = require("../../Models/Sites/Site");

router.get("/list", jwtHelper.authenticateToken, async (req, res) => {
    const sites = await Site.find({});

    res.status(200).json({success:true, sites: sites});
});

module.exports = router;