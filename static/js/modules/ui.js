//Reset inputField
export function emptyField() {
    document.querySelector("input").value = "";
}

//Verwijder huidige kunstwerken
export function deleteResults() {
    let articleElements = document.querySelectorAll("section > article");
    articleElements.forEach(articleElement => {
        articleElement.remove();
    })
}

//Open side detail page
export function openAside() {
    const aside = document.querySelector("aside");
    aside.classList.add("asideOpen");
}

//Close side detail page
export function closeAside() {
    const aside = document.querySelector("aside");
    aside.classList.remove("asideOpen");
}

//Arrow Visible when scroll in detail page
export function arrowVisible() {
    const asideSection = document.querySelector("aside > section");
    const arrowIcon = document.querySelector(".arrowIcon");

    let verschilScroll = asideSection.scrollHeight - asideSection.clientHeight;
    if (verschilScroll > 30) {
        arrowIcon.classList.add("arrowVisible")
    }
    else {
        arrowIcon.classList.remove("arrowVisible")
    }
}