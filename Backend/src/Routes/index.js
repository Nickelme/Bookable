const express = require('express');
const router = express.Router();
const fs = require('fs');

routes = fs.readdirSync(__dirname, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

routes.forEach(route => {
    console.log("Adding Routes for " + route);
    router.use('/' + route.toLowerCase(), require("./" + route));
});

module.exports = router;