const { networkInterfaces } = require('os')


module.exports = async (request, reply) => {

	let ip
    
	let location

	function getIp() {
		const nets = networkInterfaces()

		const results = Object.create(null) 

		for (const name of Object.keys(nets)) {
			for (const net of nets[name]) {
        
				const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
				if (net.family === familyV4Value && !net.internal) {
					if (!results[name]) {
						results[name] = []
					}
					results[name].push(net.address)
				}
			}
		}
        
		if(results && results['Wi-Fi'] && results['Wi-Fi'][0]) return results['Wi-Fi'][0]
            
		else return null
	}
    
	ip =  request.query.ipDefault == 'true' ? global.settings.ipDefault : getIp()
	
	if(ip == null) {
		return reply.send({  message: 'Error al obtener el ip!!' })
	}

	else {
		let urlIpApi = global.settings.ipApi.url + ip + global.settings.ipApi.queryParams.fields

		const responseIpApi = await global.libs.fetch(urlIpApi)	   
		
		location = await responseIpApi.json()

		if(Object.entries(location).length === 0)  return reply.send({  message: 'ha occurrido un error con IP-API. . Agregue ?ipDefault=true a la url e intente de nuevo' })

	
		else {

			let objectToReturn = {
				'Pais': location.country,
				'Ciudad': location.city,
				'Region': location.regionName,
				'Codigo_pais': location.countryCode,
				'Latitud': location.lat,
				'Longitud': location.lon,
			}
			

			reply.send({ 'Ubicacion':objectToReturn })
		}
	}
}