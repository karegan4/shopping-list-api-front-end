class Store {
    static all = []

    constructor({id, name}){
        this.id = id
        this.name = name
        this.element = document.createElement('li')
        this.element.id = `store-${id}`
        this.storeList = document.getElementById('stores')
        this.sorted = false
        this.allItemsBtnID = `all-items-${this.id}`
        this.deleteBtns = `delete-${this.id}`
        this.editBtns = `update-${this.id}`
        
        Store.all.push(this)
    }

    attachToDom(){
        
        this.storeList.append(this.fullRender())
        
        this.addEventListeners()
        
    }

    
   
    addEventListeners(){
        
        // let a = document.getElementById(this.allItemsBtnID)
        // a.addEventListener('click', this.displayItems)
        
        // this.element.addEventListener('click', this.displayItems)
        let b = document.getElementById(this.deleteBtns)
        b.addEventListener('click', this.handleStoreClick)

        let c = document.getElementById(this.editBtns)
        c.addEventListener('click', this.handleStoreClick)
    }

        fullRender(){
           
        this.element.innerHTML = `
        <center>
        <div id=store-boxes>
        
        
        
        <h3 id="store-names"><li><u name="name" id="${this.element.id}">${this.name}</u></li></h3>
        <br>
        <label id="current-items">Current Items for this Store:</label>
        <br><br>
        <ul style="list-style: none;" class="itemsList" id="itemsList">
        <li class="iListt" id="${this.id}">
        </li>
        
        </ul>
        <br><br>
        <span>
        <button class="update-store" id="update-${this.id}" data-id="${this.id}"> Edit This Store </button>&nbsp; &nbsp; &nbsp;
        <button class="delete-store" id="delete-${this.id}" data-id="${this.id}">Delete This Store</button>
        <br><br>
        </span>
        *Deleting store will delete all store items as well.*
        <br><br>
        </center></div>
        <br>
        `
        //All of store display info (per store) here
        
        return this.element
        
    }

    get items(){
        return Item.all.filter(i => i.store_id == this.id)
    }


    static find(id){
        return Store.all.find(c => c.id == id)
        
    }


    // displayItems = (e) => {
    //     console.log(e)
    //     debugger
    // }
    
    displayItems = (e) => {
        
        const storesList = document.getElementById('stores')
        const itemsLis = document.getElementById('itemsList')
        console.log(this.element.id)
        
        // let itemsListt = document.getElementsByClassName("itemsList")
        // Array.from(itemsListt).forEach((el) => {
            
        //     console.log(el.id)
        //     let elId = document.getElementById(el.id)
        //     // // el.innerText = "hi"
        //     // elId.innerHTML = "hi"
        //     // if (el.id == this.element.id){
        //     //     el.innerHTML = `
        //     //     ${el.id}`
        //     // }
        // })
        // itemsLis.innerHTML = ""
        
        
        
        

        this.items.forEach(i => {

            // let eachList = document.getElementById(`${this.id}`)
            console.log(`${i.name} ${i.store_id}`)
            
            
            // eachList.innerHTML += `<li>${i.name} &nbsp; &nbsp; <button id="edit-${i.id}">Edit Item</button> &nbsp; &nbsp; <button>Delete Item</button><br><br></li>`
            
            
            i.attachToDom()
            
        })
        
        
    }

    updateStoreOnDom(store) {
    
        let liStore = document.querySelector(`#store-${store.id} li`)
        // debugger
        liStore.querySelector('u').innerText = store.name
        
    }
    
    sendPatchRequest(storeId) {
        const name = document.getElementById(`update-name-${storeId}`).value
        let storeObj = {
            name
        }
        let configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(storeObj)
        }
        fetch(`http://localhost:3000/stores/${storeId}`, configObj)
        .then(res => res.json())
        .then(response => 
            
            this.updateStoreOnDom(response) )
        // debugger
        let form = document.getElementById(`update-form-${storeId}`)
        form.remove()
    }
    
    
    
    
    handleStoreClick = (e) => {
        
        
        
        if (e.target.className === "delete-store"){
            let storeItems = this.items
            
            let deleteStoreItems = storeItems.forEach(el => {
                console.log(el.id)
                
                let id = el.id
                // debugger
                deleteItem(id)
                
            })
            deleteStoreItems
            // debugger
            let id = e.target.dataset.id
            deleteStore(id)
            
            // debugger
        }
        else if(e.target.className === "update-store") {
            let storeId = e.target.dataset.id
            
            e.target.className = "save"
            e.target.innerText = "Save"
            addUpdateStoreFields(storeId)
        }
        else if(e.target.className === "save"){
            let storeId = e.target.dataset.id
            e.target.className = "update-store"
            e.target.innerText = "Edit This Store"
            this.sendPatchRequest(storeId)
        }
        
    }
    
}
//id="${this.element.id}"