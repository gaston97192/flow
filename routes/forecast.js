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

		ip =  request.query.ipDefault == 'true' ? global.settings.ipDefault : getIp()
		
		if(ip == null) {
			return reply.send({  message: 'Error al obtener el ip!!' })
		}
	
		else {
			let urlIpApi = global.settings.ipApi.url + ip  + global.settings.ipApi.queryParams.fields
	
			const responseApi = await global.libs.fetch(urlIpApi)	
  
			const cityApi = await responseApi.json()

			if(Object.entries(cityApi).length === 0 || !cityApi.lat || !cityApi.lon ) return reply.send({  message: 'ha occurrido un error con IP-API. . Agregue ?ipDefault=true a la url e intente de nuevo' })

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

	let url = global.settings.openWheater.url + global.settings.openWheater.methods.forecast + global.settings.openWheater.queryParams.lat + responseObj.ubicacion.Latitud +
	global.settings.openWheater.queryParams.lon +  responseObj.ubicacion.Longitud + global.settings.openWheater.queryParams.lang + global.settings.openWheater.queryParams.units  + 
	global.settings.openWheater.queryParams.cnt + global.settings.openWheater.queryParams.appid + global.settings.openWheater.key
	
	let responseApi = await global.libs.fetch(url)	   

	const wheater = await responseApi.json()

	let listDays = []

	let i = 1
	for (let day of wheater.list) {

		let dayFormat = {}

		dayFormat['Dia'] = global.libs.moment().add(i, 'days').format('dddd')

		dayFormat['Descripcion']= day.weather[0].description.toUpperCase() || 'Descripcion no disponible',
		dayFormat['Temperatura']= day.main.temp + ' Grados',
		dayFormat['Maxima']= day.main.temp_max + ' Grados',
		dayFormat['Minima']= day.main.temp_min + ' Grados',
		dayFormat['Humedad']= day.main.humidity + '%' 

		listDays.push(dayFormat)
		i ++
	}

	responseObj.clima= listDays

	reply.send(responseObj)

}