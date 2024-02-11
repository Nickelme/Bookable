const { Console } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');

let handlers = fs.readdirSync(__dirname, { withFileTypes: true }).filter(dirent => dirent.isFile() && dirent.name != "index.js").map(dirent => dirent.name);

handlers.forEach((handler) => {
    console.log("Adding Handler: " + handler);
    router.use("", require("./" + handler));
});

module.exports = router;