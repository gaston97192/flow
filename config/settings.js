const settings = {
	openWheater: {
		key: '3fa1df3e15436578eae91ab586a2a58a',
		url: 'http://api.openweathermap.org',
		methods: {
			geo: '/geo/1.0/direct',
			weahter: '/data/2.5/weather'
		},
		queryParams: {
			q: '?q=',
			limit: '&limit=1',
			appid: '&appid=',
			lat: '?lat=',
			lon: '&lon=',
			units: '&units=metric',
			lang: '&lang=es'
		}
	},

	ipApi: {
		url: 'http://ip-api.com/json/',
		statusResponse: {
			fail: 'fail',
			success: 'success'
		},
		queryParams: {
			fields: '?fields=city,country,countryCode,regionName,lat,lon',
		}
	}
}

module.exports = settings
