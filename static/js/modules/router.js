import { setLoading } from './states.js'
import { renderData, imgRenderCheck, getDetailID } from './renderData.js'
import { setURL, getData } from './getData.js'
import { deleteResults, emptyField, closeAside } from './ui.js'
import './vendor/routie.min.js'

export function handleRoutes() {
  routie(
    {
    '': () => {
        deleteResults();

        setLoading();
        let uitgelicht = "";
        let searchURL = setURL(uitgelicht);

        getData(searchURL)
        .then(data => {
          renderData(data)
            .then(imgRenderCheck())
            .then(getDetailID())
        })
        .then(emptyField())
    },
    ':id': inputField => {
      deleteResults();
      setLoading();

      let searchURL = setURL(inputField);
      getData(searchURL)
      .then(data => {
        renderData(data, inputField).then(imgRenderCheck()).then(getDetailID())
      })
      .then(emptyField())
    }
  })
}

//Close Aside EventListener
const closeAsideButton = document.querySelector("aside nav button");
closeAsideButton.addEventListener("click", closeAside);


//Set Routing on Input value
function searchField(event) {
  event.preventDefault();

  let searchValue = document.querySelector("input").value;
  window.location.hash = searchValue;
}

const form = document.querySelector("form");
form.addEventListener("submit", searchField);

