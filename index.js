
    
  
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
      const newStoreUl = document.getElementById("stores");
      newStoreUl.innerHTML += `<li> ${store.name} 
      <button class="Add Item">Add Item</button></li>
      ${store.id}<br><br>`
      
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
    })
}



    //grab all the necessary DOM elements

function fetchItems(){
    fetch('http://localhost:3000/items')
    .then(res => res.json())
    .then(addItems)
}

function addItems(response){
    response.forEach( item => {
      const newItemUl = document.getElementById("items");
      newItemUl.innerHTML += `<li> ${item.name} ${item.store_id}</li>`
      
    })
}






document.addEventListener("DOMContentLoaded", () => {

  
    //attach event listeners
    fetchStores()
    newStoreForm.addEventListener("submit", handleFormSubmit)

    fetchItems()
    
});
  
  