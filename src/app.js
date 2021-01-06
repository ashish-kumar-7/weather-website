const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

const homepath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(homepath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aric'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aric'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the page for helping you.....',
        title: 'Help',
        name: 'Aric'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aric',
        errormessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aric',
        errormessage: "Page Not Found"
    })
})

app.listen(port)