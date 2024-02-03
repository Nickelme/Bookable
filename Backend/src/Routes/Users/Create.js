const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../Models/Users/Users');
const jwtHelper = require("../../Utils/JWTToken")

async function registerUser(req, res){
    const params = req.body;
    let errors = [];
    if (!params.firstName) { errors.push({ msg: "first name is required!" }); }

    if (!params.lastName) { errors.push({ msg: "a last name is required!" }); }

    if (!params.email) {
        errors.push({ msg: "An email is required!" });
    } else {
        let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!params.email.match(emailFormat)) { errors.push({ msg: "Your email is invalid!" }); }
    }

    if (!params.password) {
        errors.push({ msg: "A password is required" });
    } else if (params.length < 8) {
        errors.push({ msg: "Your password is too short" });
    }

    if (errors.length > 0) {
        res.status(400).json({ "success": false, "errors": errors });
        return;
    }
    const user = await User.findOne({ email: params.email });
    if (user) {
        errors.push({ msg: "an account already exists with that email!" })
        res.status(400).json({ "success": false, "errors": errors });
        return;
    }
    const newUser = new User({
        "firstName": params.firstName,
        "lastName": params.lastName,
        "email": params.email
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(params.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => {
                    res.status(200).json({ "success": true });
                })
                .catch(err => {
                    console.log("Registration Error: " + err);
                    errors.push({ msg: "There was an error during registration!" });
                    res.status(500).json({ "success": false, "errors": errors });
                })
        });
    });
}

router.post("/create", jwtHelper.authenticateToken, async (req, res)=>{
    registerUser(req, res);
});

router.post("/createFirstUser", async(req, res)=>{
    var count = await User.count()
    if(count == 0){
        registerUser(req, res);
    }else{
        let errors = [];
        errors.push("Not the first account");
        res.status(400).json({"success": false, "errors": errors});
    }
});


module.exports = router;