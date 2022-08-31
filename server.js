
import Fastify from 'fastify';

class Server {

    constructor() {
        this.fastify = Fastify({
            logger: false
          });

          this.loadRoutes();
    }

    listen(){
       this.fastify.listen({ port: process.env.PORT, host: process.env.HOST },  (err, address) => {
            if (err) {
              console.error(err);
              process.exit(1);
            }
            console.log(`Servidor corriendo en  ${address}`);
          })
    }

    loadRoutes() {
        this.fastify.get('/v1/location', require('./routes/location'));
        this.fastify.get('/v1/current/:city', require('./routes/current'));
        this.fastify.get('/v1/forecast/:city', require('./routes/forecast'));
    }
}

module.exports = Server;

