const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");


function checkToken(){
    if(!process.env.TOKEN_SECRET){
        process.env.TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex');
        fs.appendFile(path.resolve(__dirname, "../../.env"), `\nTOKEN_SECRET=${process.env.TOKEN_SECRET}`, (err)=> {
            if(err){
                console.log(err);
            }
        });
    }
}

checkToken();

module.exports = {
    generateToken(userid){
        return jwt.sign({"userid": userid}, process.env.TOKEN_SECRET, {"expiresIn": "24h"})
    },

    authenticateToken(req, res, next){
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user

            next()
        })
    }
}