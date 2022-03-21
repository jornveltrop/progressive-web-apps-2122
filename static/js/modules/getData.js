import { setError } from './states.js';
import { closeAside } from './ui.js';

const apiKey = "AbH3UnTw";

//URL ophalen
export function setURL(inputField) {
    const h1 = document.querySelector(".titels h1");
    const h2 = document.querySelector(".titels h2");
    const aantalResults = 100;
    const apiURL = `https://www.rijksmuseum.nl/api/nl/collection/?key=${apiKey}`;

    //Reset if aside is open
    closeAside();

    //Titel vullen met zoekterm
    h2.textContent = "Resultaten voor:";
    h1.innerHTML = "<span>'" + inputField + "'</span>"; 

    //In geval geen input zoekbalk, laat uitgelicht zien
    if (inputField == 0) {
        inputField = "";
        h1.textContent = "Uitgelicht"; 
        h2.textContent = "";
    }

    //URL instellen
    let getURL = apiURL + `&q=${inputField}&ps=${aantalResults}`;
    return getURL;
}

//Detail URL instellen
export function setDetailURL(id) {
    const detailURL = `https://www.rijksmuseum.nl/api/nl/collection/`;
    let getDetailURL = detailURL + `${id}?key=${apiKey}`;
    return getDetailURL;
}

//Haal data op (op basis van zoekveld)
export async function getData(url) {
    let dataResults = fetch(url)
    .catch(error => setError(error, 1))
    .then(response => response.json())
    return dataResults;
}