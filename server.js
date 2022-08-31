
import Fastify from 'fastify';


class Server {

     listen() {

        const fastify = Fastify({
            logger: false
          })
          

        fastify.listen({ port: process.env.PORT, host: process.env.HOST },  (err, address) => {
            if (err) {
             console.error(" --> Error al levantar el servidor <--",err)
             process.exit(1)
            }
            console.log(`server listening on ${address}`)
          })
    }
}

module.exports = Server