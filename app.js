// Modules
import express from 'express'
import { engine } from 'express-handlebars';
import fetch from 'node-fetch';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;


// Aangeven waar onze statishce files zich bevinden  
app.use(express.static('static'));

// Templating engine
app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');

//Routing
app.get('/home', async (req, res) => {
    const apiKey = "AbH3UnTw";
    let query = "Rembrandt";
    let amountResults = "100"
    let apiURL = `https://www.rijksmuseum.nl/api/nl/collection/?key=${apiKey}`;
    let getURL = apiURL + `&q=${query}&ps=${amountResults}`;

    let response = await fetch(getURL);
    let data = await response.json();

    let objects = data.artObjects;
    res.render('home', { objects });
});

// Set server
app.listen(port, () => {
    console.log(`Gebruikte poort:${port}!`)
});