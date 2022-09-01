const { networkInterfaces } = require('os')


module.exports = async (request, reply) => {

	const city = request.params.city

	let ip

	let responseObj = {
		ubicacion: null,
		clima: null
	}

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

	if(city) {
		const url = global.settings.openWheater.url + global.settings.openWheater.methods.geo + global.settings.openWheater.queryParams.q + city + 

		global.settings.openWheater.queryParams.limit + global.settings.openWheater.queryParams.appid + global.settings.openWheater.key

		let responseApi = await global.libs.fetch(url)	   

		const cityApi = await responseApi.json()

		responseObj.ubicacion = {
			'Nombre':  cityApi[0].name,
			'Latitud':  cityApi[0].lat,
			'Longitud':  cityApi[0].lon,
		}
	}
	else {		
		ip = getIp()
		ip = '1.178.48.0'

		
		if(ip == null) {
			return reply.send({  message: 'Error al obtener el ip!!' })
		}
	
		else {
			let urlIpApi = global.settings.ipApi.url + ip  + global.settings.ipApi.queryParams.fields
	
			const responseApi = await global.libs.fetch(urlIpApi)	   
			const cityApi = await responseApi.json()

			if(cityApi.status == global.settings.ipApi.statusResponse.fail)  return reply.send({  message: 'Ha ocurrido un error!!', cityApi })

			else {
				responseObj.ubicacion = {
					'Pais':  cityApi.country,
					'Ciudad':  cityApi.city,
					'Region':  cityApi.regionName,
					'Codigo_pais':  cityApi.countryCode,
					'Latitud':  cityApi.lat,
					'Longitud':  cityApi.lon,
				}
			}
		}
	}


	let url = global.settings.openWheater.url + global.settings.openWheater.methods.weahter + global.settings.openWheater.queryParams.lat + responseObj.ubicacion.Latitud +
	global.settings.openWheater.queryParams.lon +  responseObj.ubicacion.Longitud + global.settings.openWheater.queryParams.lang + global.settings.openWheater.queryParams.units  + 
	global.settings.openWheater.queryParams.appid + global.settings.openWheater.key
	
	let responseApi = await global.libs.fetch(url)	   

	const wheater = await responseApi.json()

	responseObj.clima = {
		'Descripcion': wheater.weather[0].description.toUpperCase() || 'Descripcion no disponible',
		'Temperatura': wheater.main.temp + ' Grados',
		'Maxima': wheater.main.temp_max + ' Grados',
		'Minima': wheater.main.temp_min + ' Grados',
		'Humedad': wheater.main.humidity + '%' 
	}

	reply.send(responseObj)
}