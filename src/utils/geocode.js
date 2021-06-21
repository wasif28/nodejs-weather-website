const request= require('request')

const geocode= (address, callback) =>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoid2FzaWYyOCIsImEiOiJjano2dnNpaGkwNDB4M2huMzZjeGVlZHhkIn0.cWe4X9m1BxrtMom-J6-xbg&limit=1'

    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect to loaction services', undefined)
        }
        else if(response.body.features.length===0){
            callback('Unable to find location of URL',undefined)
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0]. center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


// geocode('Rawalpindi', (error, data)=>{
//     console.log('Error', error)
//     console.log('Data', data)
// })

module.exports= geocode