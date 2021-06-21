const path= require('path')
const express= require('express')
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')


const app = express()

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))


//Defining Paths for Express Configuration
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Wasif Sheikh'
    })
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title: 'About Me',
        name: 'Wasif Sheikh'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help Page',
        paragraph: 'I wrote this help page as a test and i hope this works',
        name: 'Wasif Sheikh'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'Please provide an Address'
        })
    }
    else{

        geocode(req.query.address , (error, data)=>{
        
            if(error){
                console.log(error)
                return res.send({error})
            }
    
            forecast(data.latitude, data.longitude, (error, forecastData) =>{
                
                if(error){
                    return res.send({error})
                }
                
                console.log(data.location)
                console.log(forecastData)
    
                res.send({
                    location: data.location,
                    forecast: forecastData,
                    address: req.query.address
                })

            })
        })

    }

})



app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Please provide a search term'
        })
    }

    console.log(req.query.search)
    
    res.send({
        products: []
    })
})


app.get('/help/*', (req,res)=> {
    res.render('404', {
        title: 'Error 404',
        name: 'Wasif Sheikh',
        message404: "Help Article Not Found!"
    })
})


app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Wasif Sheikh',
        message404: 'Page Not Found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})