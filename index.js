
    
  
    //form and relevant input fields

    


    //stores
    const newStoreForm = document.getElementById("create-store-form");
    const newStoreName = document.getElementById("new-store-name");
  
    //items
    const newItemForm = document.getElementById("create-item-form")
    const allItemsBtns = document.getElementsByClassName("all-items")
    const newItemName = document.getElementById("new-item-name")

    //ul where new stores will live on the DOM
    const newStoreUl = document.getElementById("stores");
    const selectStore = document.getElementById("select-store")


    //items
    const newItemUl = document.getElementById("items");
    const itemsListUl = document.getElementById("itemsList")
    const allItemsLis = document.getElementsByClassName("itemsLis")


const createNewStore = event => {
    event.preventDefault();
    //stop form from trying to submit

    const newStoreName = document.getElementById("new-store-name");
    const newStore = document.createElement("li");
    newStore.innerText = newStoreName.value;

    appendNewStore(newStore);
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
        console.log(store)
        let newStore = new Store({id: store.id, name: store.name})
        newStore.attachToDom()
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


function handleFormClick(e){
    if (e.target.className === "showItemForm"){
        hideBtnLoadForm(e)
    }

    // Array.from(allItemsBtns).forEach(function(item) {
    //     if (e.target.id === item.id) {
    //         console.log(item.id)
            
    //         //item.id = all-items-# of button clicked
    //         doAClick(e)
            
    //         Array.from(allItemsLis).forEach(function(item) {
    //             console.log(item.id)
                
    //         })
            
    //     }
    //     // let itemId = item.id
    // })
    
        
    // if (e.target.className === "all-items") {

    //     doAClick(e)
         
    // }

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
    .then(data => {
        
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
        
        
        // newItem.attachToDom()
        
        // document.getElementById("itemsList").innerHTML += `${newItem.name}`
    
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
    newItemForm.addEventListener("submit", handleItemFormSubmit)
    // document.getElementsByClassName("all-items")
    
});
  
