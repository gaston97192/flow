
import Fastify from 'fastify'

class Server {

	constructor() {
		this.fastify = Fastify({
			logger: false
		})

		this.loadRoutes()
	}

	listen(){
		this.fastify.listen({ port: process.env.PORT, host: process.env.HOST },  (err, address) => {
			if (err) {
				console.error(err)
				process.exit(1)
			}
			console.log(`Servidor corriendo en  ${address}`)
		})
	}

	loadRoutes() {
		let baseUrl = process.env.BASEURL

		this.fastify.get(`${baseUrl}/location`, require('../routes/location'))

		this.fastify.get(`${baseUrl}/current/:city?`, require('../routes/current'))

		this.fastify.get(`${baseUrl}/forecast/:city`, require('../routes/forecast'))
        
	}
}

module.exports = Server

