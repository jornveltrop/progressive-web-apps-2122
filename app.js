// Requires
const express = require('express');
const hbs  = require('express-handlebars');
const handlebars = hbs.engine;
const fetch = require('node-fetch')
require('dotenv').config()

//Variabelen
const app = express();
const apiKey = process.env.APIKEY;
const port = process.env.PORT;
let amountResults = "100"
let apiURL = `https://www.rijksmuseum.nl/api/nl/collection/?key=${apiKey}`;


// Aangeven waar onze statishce files zich bevinden  
app.use(express.static('static'));

// Templating engine
app.engine('hbs', handlebars({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');



//Routing
app.get('/', (req, res) => {
    let query = "";
    let getURL = apiURL + `&q=${query}&ps=${amountResults}`;

    fetch(getURL)
        .then(async response => {
            let data = await response.json()
            let objects = data.artObjects
            res.render('home', {
                title: 'Uitgelicht',
                subtitle: '',
                objects
            })
        })
});

app.get('/search', (req, res) => {

    let getURL = apiURL + `&q=${req.query.q}&ps=${amountResults}`;

    fetch(getURL)
        .then(async response => {
            let data = await response.json()
            let objects = data.artObjects
            if (objects == 0) {
                res.render('error', {
                    title: req.query.q,
                    subtitle: 'Helaas, geen resultaten voor:'
                })
            } else {
                res.render('results', {
                    title: req.query.q,
                    subtitle: 'Resultaten voor:',
                    objects
                })
            }            
        })
})

app.get('/detail/:id', (req, res) => {
    let imgSize = 2000;
    const detailURL = `https://www.rijksmuseum.nl/api/nl/collection/`;
    let getURL = detailURL + `${req.params.id}?key=${apiKey}`;

    fetch(getURL)
        .then(async response => {
            let data = await response.json()
            let object = data.artObject
            console.log(object);
            res.render('detail', { object, imgSize })
        })
})

// Set server
app.listen(port, () => {
    console.log(`Gebruikte poort:${port}!`)
});