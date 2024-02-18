globalThis.WebSocket = require("ws"); //Because home-assistant-js-websockets is a browser library have to fill global WebSocket to work
const Site = require("../../Models/Sites/Site");
const haInstance = require("./HomeAssistant")

const haMap = new Map();

module.exports = {

    startService() {
        (async () => {
            const allSites = await Site.find({});
            if (allSites.length == 0) {
                console.log("No Sites exist on startup!");
                return;
            }
            for (var i = 0; i < allSites.length; i++) {
                if (allSites[i].usesHomeAssistant) {
                    console.log("Adding HAConnection " + allSites[i].siteName);
                    this.addHA(allSites[i]);
                }
            }
        })();
    },

    isHAConnected(siteId){
        let haSite = haMap.get(siteId.toString());
        return haSite.isConnected;
    },

    addHA(newSite) {
        const newInstance = new haInstance(newSite._id.toString(), newSite.haUrl, newSite.haLongLivedToken);
        haMap.set(newSite._id.toString(), newInstance);
    }

};