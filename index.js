import * as dotenv from 'dotenv';

const Server = require('./server');

dotenv.config();

const server = new Server()

server.listen();


