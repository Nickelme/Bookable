const express = require('express');
const router = express.Router();
const jwtHelper = require('../../Utils/JWTToken');
const Site = require("../../Models/Sites/Site");
const haManager = require("../../Services/HomeAssistant/HomeAssistantManager");

router.get("/list", jwtHelper.authenticateToken, async (req, res) => {
    const sites = await Site.find({});
    let siteList = [];
    for (var i = 0; i < sites.length; i++){
        siteList[i] = structuredClone(sites[i]._doc);
        siteList[i]._id = sites[i]._id.toString();
        if (siteList[i].usesHomeAssistant){
            siteList[i].haConnected = haManager.isHAConnected(siteList[i]._id);
            delete siteList[i].haLongLivedToken;
        }
    }


    res.status(200).json({ success: true, "sites": siteList });
});

module.exports = router;