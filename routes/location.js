const { networkInterfaces } = require('os');

const fetch = require('node-fetch');


module.exports = async (request, reply) => {

const nets = networkInterfaces();
const results = Object.create(null); 
let ip;
let location;

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {

        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
      }
    }



    if(results && results['Wi-Fi'] && results['Wi-Fi'][0]) ip = results['Wi-Fi'][0];

    else return { message: 'No se pudo obtener el ip' };

    let urlIpApi = process.env.IPAPI_BASE + ip + "?access_key=" + process.env.IPAPI_KEY;

      const responseIpApi = await fetch(urlIpApi)
           
      location = await responseIpApi.text();


      if(!location.success)  return { message: 'Hay ocurrido un error!', location }


      else return { location }
  }