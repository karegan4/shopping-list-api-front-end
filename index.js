
    
  
    //form and relevant input fields
    const newFormButton = document.getElementById('new-form-btn')
    //stores
    const newStoreForm = document.getElementById("create-store-form");
    const newStoreName = document.getElementById("new-store-name");
  
    //items
    const newItemForm = document.getElementById("create-item-form")


    //ul where new stores will live on the DOM
    const newStoreUl = document.getElementById("stores");

    //items
    const newItemUl = document.getElementById("items");
    
const createNewStore = event => {
    event.preventDefault();
    //stop form from trying to submit

    const newStoreName = document.getElementById("new-store-name");
    const newStore = document.createElement("li");
    newStore.innerText = newStoreName.value;

    appendNewStore(newStore);
    event.target.reset();
};

const createNewItem = event => {
    event.preventDefault();
    const newItemName = document.getElementById("new-item-name");
    const newItem = document.createElement("li");
    newItemUl.innerText = newItemName.value;

    appendNewItem(newItem);
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

function hideBtnLoadForm(e){
    e.target.hidden = true
    const newForm = document.getElementById('new-form-container')
    newForm.hidden = false
}

function addStores(response){
    response.forEach( store => {
      let newStoreUl = document.getElementById("stores");
      newStoreUl.innerHTML += `
    <li> ${store.name} 
<button id=addItemButton>Add Item to ${store.name}</button>
<div id="new-form-container" hidden="true">
    <form id="item-form">
    <h3>Add New Item</h3>
    <label for="item-name">Name:</label>
    <input type="text" name="name" id="item-name">
    <input type="submit" value="Create">
    </form>
    </li>
`

    })
    document.getElementById("demo").innerHTML = newStoreUl.innerHTML;
    
}

// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// } 

function handleStoreFormSubmit(e){
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
    newStoreForm.reset()
}


// function hideForm(){
//     let form = document.getElementById("create-item-form")
//     form.style.display = "none";
// }

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
    fetchItems()
    newStoreForm.addEventListener("submit", handleStoreFormSubmit)    
    newFormButton.addEventListener('click', hideBtnLoadForm)
});
  
