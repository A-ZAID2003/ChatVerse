const express = require('express');
const http = require('http');
const cors = require('cors');
const setUpSocket = require('./socket');
const connectDB = require('./db'); 
const dotenv = require('dotenv');

const app = express();
app.use(cors());

dotenv.config();
connectDB();

const server = http.createServer(app);

setUpSocket(server);

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log("✅ Server running on port 5000");
});
