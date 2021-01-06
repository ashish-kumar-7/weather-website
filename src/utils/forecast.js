const request = require('request')

const api = (process.env.API_FORECAST)
const forecast = (lattitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&units=metric&appid=${api}`

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Cannot connect to weather service", undefined)
        }
        else if(body.message) {
            callback("Unable to find the location", undefined)
        }
        else{
            callback(undefined, 'Day Temperature is '+ body.daily[0].temp.day + ' with a maximum and minimum temperature of '+body.daily[0].temp.max+' & '+body.daily[0].temp.min+' and forecast is '+body.hourly[0].weather[0].main
            )
        }
    })
}

module.exports = forecast
