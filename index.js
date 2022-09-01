import settings from './config/settings' 
require('dotenv').config()

const Server = require('./server/server')

//configuraciones
global.settings = settings


const libs = {
	'fetch': require('node-fetch'),
	'moment': require('moment')
}

libs.moment.locale('es') 

global.libs = libs

//Se instancia y se levanta el server
const server = new Server()

server.listen() 