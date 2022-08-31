const { networkInterfaces } = require('os');


module.exports = async (request, reply) => {

    let ip;
    
    let location;

    function getIp() {
        const nets = networkInterfaces();

        const results = Object.create(null); 

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
        
            if(results && results['Wi-Fi'] && results['Wi-Fi'][0]) return results['Wi-Fi'][0];
            
            else return null;
    }
    
      ip = getIp();

      let urlIpApi = global.settings.ipApi.url + ip;

      const responseIpApi = await global.libs.fetch(urlIpApi)
           
      location = await responseIpApi.json();

      if(location.status == global.settings.ipApi.statusResponse.fail)  return reply.send({  message: 'Ha ocurrido un error!!', location })

      else reply.send({ location })
  }