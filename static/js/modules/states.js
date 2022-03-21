const sectionData = document.querySelector(".resultaten");
const loader = document.querySelector(".loader");

// ******* //
// LOADING //
// ******* //

//Start loading animatie
export function setLoading() {
    loader.classList.add("loaderDisplay");
    sectionData.classList.add("resultsNoDisplay");
}

//Stop loading animatie
export function stopLoading() {
    loader.classList.remove("loaderDisplay");
    sectionData.classList.remove("resultsNoDisplay");
}



// ******* //
//  ERROR  //
// ******* //

//Error handling
export function setError(error, num, inputField) {
    const h1 = document.querySelector(".titels h1");
    const h2 = document.querySelector(".titels h2");
    const errorImg = document.querySelector(".resultaten > img");

    // [error] Geen connectie
    if (error, num == 1) {
        h2.textContent = "We kunnen momenteel geen kunstwerken ophalen.";
        h1.textContent = "Helaas..."; 
    } 
    // [error] Geen resultaten
    else if (num == 2) {
        h1.innerHTML = "<span>'" + inputField + "'</span>"; 
        h2.textContent = "Helaas, geen resultaten voor:";
    }

    //[error] Algemeen
    else if (num == 3) {
        h1.textContent = "Oeps..."; 
        h2.textContent = "Er is iets mis gegaan";
    }
    
    errorImg.src = "./images/empty_frame.png"
    errorImg.classList.add("visible");
    console.log(error);
    stopLoading();
}