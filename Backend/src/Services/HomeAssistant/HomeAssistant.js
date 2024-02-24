const haConnector = require('home-assistant-js-websocket');

class HomeAssistant {

    constructor(haName, haUrl, haLLT) {
        this.haName = haName;
        this.haUrl = haUrl;
        this.haLLT = haLLT;
        this.isConnected = false;
        this.tryConnect();
    }

    tryConnect() {
        (async () => {
            try {
                this.auth = haConnector.createLongLivedTokenAuth(this.haUrl, this.haLLT);
                this.connection = await haConnector.createConnection({ auth: this.auth });
                this.connection.addEventListener("ready", this.connectionReady);
                this.connection.addEventListener("disconnected", this.connectionLost)
                this.isConnected = true;
                console.log(`Success: HA Connected to ${this.haUrl}`);
                haConnector.subscribeEntities(this.connection, this.entityUpdate);
                this.getEntitiesList();
            } catch (err) {
                console.log(err);
            }
        })();
    }

    connectionReady(connection, data){
        this.isConnected = true;
    }

    connectionLost(connection, data){
        this.isConnected = false;
    }

    entityUpdate(entities) {
        console.log(entities);
    }

    async getDeviceList(){
        const deviceList = await this.connection.sendMessagePromise({type: "config/device_registry/list"});
        console.log(deviceList);
        return deviceList;
    }

    async getEntitiesList(){
        const entityList = await this.connection.sendMessagePromise({type: "config/entity_registry/list"});
        console.log(entityList);
        return entityList;
    }

}

module.exports = HomeAssistant;