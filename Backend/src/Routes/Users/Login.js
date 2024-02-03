const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../Models/Users/Users')
const jwtHelper = require('../../Utils/JWTToken');

router.post("/login", async (req, res) => {
    const params = req.body;
    let errors = [];

    if (!params.email) {
        errors.push({ msg: "An email is required!" });
    } else {
        let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!params.email.match(emailFormat)) { errors.push({ msg: "Your email is invalid!" }); }
    }

    if (!params.password) {
        errors.push({ msg: "A password is required!" });
    }

    if (errors.length > 0) {
        res.status(400).json({ "success": false, "errors": errors });
        return;
    }

    User.findOne({ email: params.email }).then(user => {
        if (!user) {
            errors.push({ msg: "The Email or Password is invalid" });
            res.status(400).json({ "success": false, "errors": errors });
            return;
        }

        bcrypt.compare(params.password, user.password).then(async isCorrect => {
            if (isCorrect) {
                var keys = jwtHelper.generateToken(user._id);
                res.status(200).json({ "success": true, "key": keys });
            } else {
                errors.push({ msg: "The Email or Password is invalid" });
                res.status(400).json({ "success": false, "errors": errors })
            }
        });
    });
});


module.exports = router;