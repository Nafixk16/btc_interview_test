const dotenv = require("dotenv");
const server = require("http").createServer();
dotenv.config();


require('./input')



PORT = process.env.PORT || 8080;
server.listen(PORT);
