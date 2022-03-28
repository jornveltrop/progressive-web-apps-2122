import './vendor/routie.min.js'

export function enhanchedDetail() {
  //Set reload on navigation back
  window.addEventListener('popstate', (e) => {
    console.log(e)
    window.location.reload();
  })


  let allAobjects = document.querySelectorAll("article > a");

  allAobjects.forEach(function(a) {
    console.log('test')
      a.addEventListener("click", function(event) {
        event.preventDefault();

        let clickedID = this.id;
        console.log(window.location.pathname);
        let url = '/detail/' + clickedID;
        history.pushState({id:clickedID}, '', url)

        //Fetch side detail from template

        // Query voor pushed neer zetten ipv nu dat 'oie t vervangt
        
      });
  });
}


