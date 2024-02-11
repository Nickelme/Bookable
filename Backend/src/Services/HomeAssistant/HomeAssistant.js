const haConnector = require('home-assistant-js-websocket');

class HomeAssistant {

    constructor(haName, haUrl, haLLT) {
        this.haName = haName;
        this.haUrl = haUrl;
        this.haLLT = haLLT;
        this.tryConnect();
    }

    tryConnect() {
        (async () => {
            try {
                this.auth = haConnector.createLongLivedTokenAuth(this.haUrl, this.haLLT);
                this.connection = await haConnector.createConnection({ auth: this.auth });
                console.log(`Success: HA Connected to ${this.haUrl}`);
                haConnector.subscribeEntities(this.connection, this.entityUpdate);
            } catch (err) {
                console.log(err);
            }
        })();
    }

    entityUpdate(entities) {
        //console.log(entities);
    }

}

module.exports = HomeAssistant;