
    
  
    //form and relevant input fields

    
//test

    //stores
    const newStoreForm = document.getElementById("create-store-form");
    const newStoreName = document.getElementById("new-store-name");
    

    //items
    const newItemForm = document.getElementById("create-item-form")
    const allItemsBtns = document.getElementsByClassName("all-items")
    const newItemName = document.getElementById("new-item-name")
    const newItemUl = document.getElementById("items");
    const itemsListUl = document.getElementById("itemsList")
    const allItemsLis = document.getElementsByClassName("itemsLis")

    //ul where new stores will live on the DOM
    const newStoreUl = document.getElementById("stores");
    const storeListUl = document.getElementById("store-list")
    const selectStore = document.getElementById("select-store")


    const createNewStore = event => {
    event.preventDefault();
    //stop form from trying to submit

    const newStoreName = document.getElementById("new-store-name");
    const newStore = document.createElement("li");
    newStore.innerText = newStoreName.value;

    appendNewStore(newStore);
    event.target.reset();
};



// const appendNewItem = item => {
//     document.getElementById("items").appendChild(item);
// }

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
        console.log(store)
        let newStore = new Store({id: store.id, name: store.name})
        newStore.attachToDom(store)
        //neeed to create new store objects
        const selectStore = document.getElementById("select-store")
        let option = document.createElement("option")
        option.value = newStore.id
        option.innerText = newStore.name
        selectStore.append(option)

        
      let newStoreUl = document.getElementById("stores");

      
      

    })    
    // document.getElementById("li-15").innerHTML += `Hi`
    
}

function hideBtnLoadForm(e){
    e.target.hidden = true
    const newForm = document.getElementById("new-form-container")
    newForm.hidden = false
    
}

// function doAClick(e){
//     e.target.hidden = true
//     console.log("I was clicked!")

//     //e.target identifies specific button clicked

//     const itemsNames = document.getElementById("itemsList")
//     const itemContainer = document.getElementById("item-container")
//     itemContainer.hidden = false
    
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
    .then(json => {
        let store = new Store(json)
        store.attachToDom()
    })  
    newStoreForm.reset()
}

function addItemToDom(item) {
    itemsListUl.innerHTML += `
    <div id="item-${item.id}">
    <li>
    <span class="name">${item.name}</span>
    </li>
    </div>
    `
}


function handleItemFormSubmit(e){
    e.preventDefault()

    const name = document.getElementById('new-item-name').value
    const store_id = document.getElementById('select-store').value

    let newItemObj = {
        name,
        store_id
    }
    
    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newItemObj)
    }
    fetch('http://localhost:3000/items', configObj)
    .then(res => res.json())
    .then(json => {
        let item = new Item(json)
        item.attachToDom()
    })
    newItemForm.reset()
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
        console.log(item)
       
        let newItem = new Item({id: item.id, name: item.name, store_id: item.store_id})
        console.log(newItem.store_id)
        
        
        newItem.attachToDom(item)
        
        // document.getElementById("itemsList").innerHTML += `${newItem.name}`
    
    })
    
}


function deleteItem(id){
    let configObj = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }
    fetch(`http://localhost:3000/items/${id}`, configObj)
    .then(res => res.json())
    .then(json => {
        alert(json.message)
    })
    
    let item = document.getElementById(`item-${id}`)

    item.remove()
}

function deleteStore(id) {
    let configObj = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
        
    }
    fetch(`http://localhost:3000/stores/${id}`, configObj)
    .then(res => res.json())
    .then(json => {
        alert(json.message)
    })
    
    let store = document.getElementById(`store-${id}`)

    store.remove()
}

function addUpdateStoreFields(storeId){
    let store = document.querySelector(`#store-${storeId} li`)
    // let name = document.getElementById('store-names').innerText
    let name = store.querySelector('u').innerText
    
    let updateForm = `
    <h5 id="edit-store-name">Edit Name: <input type="text" name="name" value="${name}" id="update-name-${storeId}"></h5>
    `
    let formDiv = document.createElement('div')
    formDiv.id = `update-form-${storeId}`
    formDiv.innerHTML = updateForm
    store.append(formDiv)
}

// function addUpdateItemFields(itemId) {
//     let item = document.querySelector(`#item-${itemId} li`)
//     let name = item.querySelector('.name').innerText
// debugger
//     let updateForm = `
//     <input type="text" name="name" value="${name}" id="update-name-${itemId}">

//     `
//     let formDiv = document.createElement('div')
//     formDiv.id = `update-form-${item.id}`
//     formDiv.innerHTML = updateForm
//     item.append(formDiv)
// }



// function sendPatchRequest(storeId) {
//     const name = document.getElementById(`update-name-${storeId}`).value
//     let storeObj = {
//         name
//     }
//     let configObj = {
//         method: 'PATCH',
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(storeObj)
//     }
//     fetch(`http://localhost:3000/stores/${storeId}`, configObj)
//     .then(res => res.json())
//     .then(response => updateStoreOnDom(response.data))
    
//     let form = document.getElementById(`update-form-${storeId}`)
//     form.remove()
// }

// function updateStoreOnDom(store) {
    
//     let liStore = document.querySelector(`#store-${store.id} li`)
//     debugger
//     liStore.querySelector('.name').innerText = store.name
    
// }

// function updateItemOnDom(item) {
//     let liItem = document.querySelector(`#item-${itemId} li`)
//     debugger
// }

document.addEventListener("DOMContentLoaded", () => {

    //attach event listeners
    fetchStores()
    fetchItems()
    newStoreForm.addEventListener("submit", handleStoreFormSubmit)
    
    newItemForm.addEventListener("submit", handleItemFormSubmit)
    // document.getElementsByClassName("all-items")
    itemsListUl.addEventListener('click', handleListClick)
    
});
  
