const settings = {
	openWheater: {
		key: '3fa1df3e15436578eae91ab586a2a58a',
		url: 'http://api.openweathermap.org',
		methods: {
			geo: '/geo/1.0/direct',
			weahter: '/data/2.5/weather',
			forecast: '/data/2.5/forecast'
		},
		queryParams: {
			q: '?q=',
			limit: '&limit=1',
			appid: '&appid=',
			lat: '?lat=',
			lon: '&lon=',
			units: '&units=metric',
			lang: '&lang=es',
			cnt: '&cnt=5'
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
	},

	ipDefault: '1.178.48.0'
}

module.exports = settings
