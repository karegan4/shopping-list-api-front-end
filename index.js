
    //grab all the necessary DOM elements
    
  
    //form and relevant input fields
    const newStoreForm = document.getElementById("create-store-form");
    const newStoreName = document.getElementById("new-store-name");
  
    //ul where new stores will live on the DOM
    const newStoreUl = document.getElementById("stores");

const createNewStore = event => {
    event.preventDefault();
    //stop form from trying to submit

    const newStoreName = document.getElementById("new-store-name");
    const newStore = document.createElement("li");
    newStore.innerText = newStoreName.value;

    appendNewStore(newStore);
    event.target.reset();
};

const appendNewStore = store => {
    document.getElementById("stores").appendChild(store);
}

function fetchStores(){
    fetch('http://localhost:3000/stores')
    .then(res => res.json())
    .then(addStores)
}

function addStores(response){
    response.forEach( store => {
      //   createNewStore(store)
      const newStoreUl = document.getElementById("stores");
      newStoreUl.innerHTML += `<li> ${store.name} </li>`
    })
}

function handleFormSubmit(e){
    e.preventDefault()

    let newStoreObj = {
        name: newStoreName.value
    }

    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newStoreObj)
    }
    fetch('http://localhost:3000/stores', configObj)
    .then(res => res.json())
    .then(data => {
        debugger
    })
}






document.addEventListener("DOMContentLoaded", () => {

  
    //attach event listeners
    fetchStores()
    newStoreForm.addEventListener("submit", handleFormSubmit)
  
  });
  
  