import { fetchWeatherApi } from 'openmeteo'

const params = {
	latitude: 43.61,
	longitude: -79.47,
	daily: [
		'wind_speed_10m_max',
		'wind_gusts_10m_max',
		'wind_direction_10m_dominant',
		'precipitation_hours',
		'sunset',
		'sunrise',
		'uv_index_max',
		'temperature_2m_min',
		'temperature_2m_max',
		'apparent_temperature_max',
		'apparent_temperature_min',
	],
	hourly: [
		'temperature_2m',
		'precipitation_probability',
		'visibility',
		'wind_speed_10m',
		'wind_direction_10m',
		'wind_gusts_10m',
		'relative_humidity_2m',
		'showers',
		'weather_code',
		'pressure_msl',
		'surface_pressure',
	],
	current: [
		'temperature_2m',
		'relative_humidity_2m',
		'wind_speed_10m',
		'wind_direction_10m',
		'wind_gusts_10m',
		'weather_code',
		'surface_pressure',
		'precipitation',
		'rain',
		'showers',
		'snowfall',
		'apparent_temperature',
	],
	timezone: 'auto',
}
const url = 'https://api.open-meteo.com/v1/forecast'
const responses = await fetchWeatherApi(url, params)

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0]
if (!response) {
	throw new Error('No response received')
}

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds()
const timezone = response.timezone()
const timezoneAbbreviation = response.timezoneAbbreviation()
const latitude = response.latitude()
const longitude = response.longitude()

const current = response.current()!
const hourly = response.hourly()!
const daily = response.daily()!

const sunrise = daily.variables(5)!
const sunset = daily.variables(4)!

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature2m: current.variables(0)!.value(),
		relativeHumidity2m: current.variables(1)!.value(),
		windSpeed10m: current.variables(2)!.value(),
		windDirection10m: current.variables(3)!.value(),
		windGusts10m: current.variables(4)!.value(),
		weatherCode: current.variables(5)!.value(),
		surfacePressure: current.variables(6)!.value(),
		precipitation: current.variables(7)!.value(),
		rain: current.variables(8)!.value(),
		showers: current.variables(9)!.value(),
		snowfall: current.variables(10)!.value(),
		apparentTemperature: current.variables(11)!.value(),
	},
	hourly: {
		time: [
			...Array(
				(Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval(),
			),
		].map(
			(_, i) =>
				new Date(
					(Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
						1000,
				),
		),
		temperature2m: hourly.variables(0)!.valuesArray()!,
		precipitationProbability: hourly.variables(1)!.valuesArray()!,
		visibility: hourly.variables(2)!.valuesArray()!,
		windSpeed10m: hourly.variables(3)!.valuesArray()!,
		windDirection10m: hourly.variables(4)!.valuesArray()!,
		windGusts10m: hourly.variables(5)!.valuesArray()!,
		relativeHumidity2m: hourly.variables(6)!.valuesArray()!,
		showers: hourly.variables(7)!.valuesArray()!,
		weatherCode: hourly.variables(8)!.valuesArray()!,
		pressureMsl: hourly.variables(9)!.valuesArray()!,
		surfacePressure: hourly.variables(10)!.valuesArray()!,
	},
	daily: {
		time: [
			...Array(
				(Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
			),
		].map(
			(_, i) =>
				new Date(
					(Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
						1000,
				),
		),
		windSpeed10mMax: daily.variables(0)!.valuesArray()!,
		windGusts10mMax: daily.variables(1)!.valuesArray()!,
		windDirection10mDominant: daily.variables(2)!.valuesArray()!,
		precipitationHours: daily.variables(3)!.valuesArray()!,
		sunset: [...Array(sunset.valuesInt64Length())].map(
			(_, i) =>
				new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000),
		),
		sunrise: [...Array(sunrise.valuesInt64Length())].map(
			(_, i) =>
				new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000),
		),
		uvIndexMax: daily.variables(6)!.valuesArray()!,
		temperature2mMin: daily.variables(7)!.valuesArray()!,
		temperature2mMax: daily.variables(8)!.valuesArray()!,
		apparentTemperatureMax: daily.variables(9)!.valuesArray()!,
		apparentTemperatureMin: daily.variables(10)!.valuesArray()!,
	},
}

// `weatherData` now contains a simple structure with arrays for datetime and weather data
console.log('\n####### Hourly weather #######\n')
const hourlyTable = []
for (let i = 0; i < weatherData.hourly.time.length; i++) {
	// console.log('  Time:', weatherData.hourly.time[i]?.toISOString())
	// console.log('  temperature2m:', weatherData.hourly.temperature2m[i])
	// console.log(
	// 	'  precipitationProbability:',
	// 	weatherData.hourly.precipitationProbability[i],
	// )
	// console.log('  visibility:', weatherData.hourly.visibility[i])
	// console.log('  windSpeed10m:', weatherData.hourly.windSpeed10m[i])
	// console.log('  windDirection10m:', weatherData.hourly.windDirection10m[i])
	// console.log('  windGusts10m:', weatherData.hourly.windGusts10m[i])
	// console.log('  relativeHumidity2m:', weatherData.hourly.relativeHumidity2m[i])
	// console.log('  showers:', weatherData.hourly.showers[i])
	// console.log('  weatherCode:', weatherData.hourly.weatherCode[i])
	// console.log('  pressureMsl:', weatherData.hourly.pressureMsl[i])
	// console.log('  surfacePressure:', weatherData.hourly.surfacePressure[i])
	// console.log('--------------------')

	hourlyTable.push({
		time: weatherData.hourly.time[i]?.toISOString(),
		temperature2m: weatherData.hourly.temperature2m[i],
		precipitationProbability: weatherData.hourly.precipitationProbability[i],
		visibility: weatherData.hourly.visibility[i],
		windSpeed10m: weatherData.hourly.windSpeed10m[i],
		windDirection10m: weatherData.hourly.windDirection10m[i],
		windGusts10m: weatherData.hourly.windGusts10m[i],
		relativeHumidity2m: weatherData.hourly.relativeHumidity2m[i],
		showers: weatherData.hourly.showers[i],
		weatherCode: weatherData.hourly.weatherCode[i],
		pressureMsl: weatherData.hourly.pressureMsl[i],
		surfacePressure: weatherData.hourly.surfacePressure[i],
	})
}
console.table(hourlyTable)

console.log('\n####### Daily weather #######\n')
const dailyTable = []
for (let i = 0; i < weatherData.daily.time.length; i++) {
	// console.log('Time:', weatherData.daily.time[i]?.toISOString())
	// console.log('windSpeed10mMax', weatherData.daily.windSpeed10mMax[i])
	// console.log('windGusts10mMax', weatherData.daily.windGusts10mMax[i])
	// console.log(
	// 	'windDirection10mDominant',
	// 	weatherData.daily.windDirection10mDominant[i],
	// )
	// console.log('precipitationHours', weatherData.daily.precipitationHours[i])
	// console.log('sunset', weatherData.daily.sunset[i]?.toISOString())
	// console.log('sunrise', weatherData.daily.sunrise[i]?.toISOString())
	// console.log('uvIndexMax', weatherData.daily.uvIndexMax[i])
	// console.log('temperature2mMin', weatherData.daily.temperature2mMin[i])
	// console.log('temperature2mMax', weatherData.daily.temperature2mMax[i])
	// console.log(
	// 	'apparentTemperatureMax',
	// 	weatherData.daily.apparentTemperatureMax[i],
	// )
	// console.log(
	// 	'apparentTemperatureMin',
	// 	weatherData.daily.apparentTemperatureMin[i],
	// )
	// console.log('--------------------')
	dailyTable.push({
		time: weatherData.daily.time[i]?.toISOString(),
		windSpeed10mMax: weatherData.daily.windSpeed10mMax[i],
		windGusts10mMax: weatherData.daily.windGusts10mMax[i],
		windDirection10mDominant: weatherData.daily.windDirection10mDominant[i],
		precipitationHours: weatherData.daily.precipitationHours[i],
		sunset: weatherData.daily.sunset[i]?.toISOString(),
		sunrise: weatherData.daily.sunrise[i]?.toISOString(),
		uvIndexMax: weatherData.daily.uvIndexMax[i],
		temperature2mMin: weatherData.daily.temperature2mMin[i],
		temperature2mMax: weatherData.daily.temperature2mMax[i],
		apparentTemperatureMax: weatherData.daily.apparentTemperatureMax[i],
		apparentTemperatureMin: weatherData.daily.apparentTemperatureMin[i],
	})
}
console.table(dailyTable)
