
    
  
    //form and relevant input fields

    //stores
    const newStoreForm = document.getElementById("create-store-form");
    const newStoreName = document.getElementById("new-store-name");
  
    //items
    const newItemForm = document.getElementById("create-item-form")
    const allItemsBtns = document.getElementsByClassName("all-items")
    const newItemName = document.getElementById("item-name")

    //ul where new stores will live on the DOM
    const newStoreUl = document.getElementById("stores");

    //items
    const newItemUl = document.getElementById("items");
    const itemsListUl = document.getElementById("itemsList")


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

const appendNewItem = item => {
    document.getElementById("items").appendChild(item);
}

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
        const storeId = `${store.id}`

      let newStoreUl = document.getElementById("stores");
      newStoreUl.innerHTML += `
    <li> ${store.name} 
    <button class="all-items" id="all-items-${store.id}">See all Items</button><br><br>
    <div id="item-container" hidden="true">
    <ul id="itemsList">
    
    </ul>
    </div>

<button class="showItemForm" id="${store.id}">Add Item to ${store.name}</button><br><br>
<div id="new-form-container" hidden="true">
    <form id="item-form-${store.id}">
    <h4>Add New Item:</h4>
    <label for="item-name">Name:</label>
    <input type="text" name="name" id="item-name">
    <input type="submit" value="Create">
    </form><br><br>
</div>

    </li>

`

    })    
    
}
function hideBtnLoadForm(e){
    e.target.hidden = true
    const newForm = document.getElementById("new-form-container")
    newForm.hidden = false
    
}
function doAClick(e){
    e.target.hidden = true
    console.log("I was clicked!")
    const itemsNames = document.getElementById("itemsList")
    const itemContainer = document.getElementById("item-container")
    itemContainer.hidden = false
    // itemsNames.innerHTML += `Hi`
    
    
}

function handleFormClick(e){
    if (e.target.className === "showItemForm"){
        hideBtnLoadForm(e)
    }
    if (e.target.className === "all-items") {
        doAClick(e)
    }
}





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
function handleItemFormSubmit(e){
    e.preventDefault()

    let newItemObj = {
        name: newItemName.value
    }
    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newStoreObj)
    }
    fetch('http://localhost:3000/items', configObj)
    .then(res => res.json())
    .then(data => {

    })
    itemFormWithId.reset()
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
        const itemStoreId = `${item.store_id}`

        const itemsBox = document.getElementById("itemsList")
        
        itemsBox.innerHTML += `
        <li> ${item.name} ${itemStoreId}</li>`
      
    })
}
// function addItems(response){
//     // response.data.forEach( item => {
//     // //     const itemStoreId = `${item.store_id}`
//     // // const itemsBox = document.getElementById("itemsContainer")
     
//     // //  itemsBox.innerHTML += `
//     // // <li> ${item.name}</li>
//     // // `  
//     // addItemToDom(item)
//     response.data.each ( item => {

//     })
// }


document.addEventListener("DOMContentLoaded", () => {

  
    //attach event listeners
    fetchStores()
    fetchItems()
    newStoreForm.addEventListener("submit", handleStoreFormSubmit)
    stores.addEventListener('click', handleFormClick)
    
    // document.getElementsByClassName("all-items")
    
    
});
  
