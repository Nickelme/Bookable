require('dotenv').config()
const express = require('express');
const apiRoutes = require('./Routes');
const mongoose = require('mongoose');
const useragent = require('express-useragent');
const helmet = require('helmet');
const haManager = require('./Services/HomeAssistant/HomeAssistantManager');

const PORT = process.env.PORT || 5001;
const HOST = process.env.BIND_ADDRESS || '127.0.0.1';
const DBURI = process.env.DBURI || 'mongodb://localhost:27017/Bookable?retryWrites=true'


mongoose.set('strictQuery', false);

mongoose
    .connect(
        DBURI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log('MongoDB Connected');
        haManager.startService();
    })
    .catch(err => console.log(err));

// App
const app = express();
app.use(express.json());
app.use(useragent.express());
app.use(helmet());

app.use('/api', apiRoutes);

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});