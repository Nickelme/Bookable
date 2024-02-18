const express = require('express');
const router = express.Router();
const jwtHelper = require('../../Utils/JWTToken');
const Site = require("../../Models/Sites/Site");

router.patch("/:id", jwtHelper.authenticateToken, async (req, res) => {
    try{
        const dbRes = await Site.findByIdAndUpdate(req.params.id, req.body, {new: true});
        delete dbRes.haLongLivedToken;
        res.status(200).json({success: true, site: dbRes});
    }catch (err){
        console.log(err);
        res.status(500).json({success: false});
    }
});

module.exports = router;