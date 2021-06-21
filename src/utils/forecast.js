const request= require('request')

const forecast= (latitude, longitude, callback) =>{
    const url= 'https://api.darksky.net/forecast/8abfa91a769773167388fa320fddbc7d/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'?units=si'

    request({url: url, json: true}, (error, response) =>{
    if(error){
        callback("Unable to connect to weather services", undefined)
    }
    else if(response.body.error){
        callback("Unable to find location of URL", undefined)
    }
    else{
        callback(undefined, response.body.daily.data[0].summary+' It is currently '+ response.body.currently.temperature+ ' degrees out. There is ' + response.body.currently.precipProbability + '% chance of rain' + '\nHighest temperature will be ' + response.body.daily.data[0].temperatureHigh + ' and the lowest will be ' + response.body.daily.data[0].temperatureLow)
    }
})
}

// forecast(-75.7088, 44.1545, (error, data) =>{
//     console.log('ERROR', error)
//     console.log('Data', data)
// })

module.exports= forecast