class Item{
    static all = []

    constructor({name, id, store_id}) {
        this.name = name
        this.id = id
        this.store_id = store_id
        this.store_store_id = `store-${this.store_id}`
        this.element = document.createElement('div')
        this.element.id = `item-${this.id}`
        this.allItemsss = `${this.store_id}`
        

        Item.all.push(this)
        // debugger
    }

    get itemList(){
        // let itemssList = document.getElementsByClassName('itemsList')
        
        // let getItems = Array.from(itemssList).forEach((el) => {
        //     let itemStoreId = this.store_id
            
        //     let elId = document.getElementById(el.id)
            
        //     // el.innerHTML = "hi"
        //     let newItemsList = el
            
        //     if (el.id == this.store_store_id){
        //         // console.log("I've been clicked")
        //         // el.innerText = "I've been clicked"
        //     }
            
        //     // console.log(`${el.id}`)
        //     // elId.innerHTML = "hi"
            
        //     // return newItemsList
        // })
        let storeId = document.getElementById(`${this.allItemsss}`)
        
        return storeId

        // let itemsListtt = document.getElementById('itemsList')
        
        // return itemsListtt
        
        
    }

    static findById(id){
        return Item.all.find(item => item.id == id)
    }

    addEventListeners(){
        
        this.element.addEventListener('click', this.handleListClick)
        let a = document.getElementById(this.editItemBtns)
        
    }

    attachToDom(){
        
        this.itemList.append(this.fullRender())
        
        this.addEventListeners()
    }

    fullRender(){
        
        
        this.element.innerHTML = `
        <li>
        <span>- <label class="name" id="${this.element.id}">${this.name}</label>&nbsp; &nbsp; 
        
        <button class="update-item" id="update-${this.id}" data-id="${this.id}">
        Edit Item</button> &nbsp; &nbsp; 
        <button class="delete" data-id="${this.id}">
        Delete Item</button></span>
        <br><br>
        
        </li>
        
        <br>
      
        `
        
        return this.element
        
    }



    updateItemOnDom(item) {
        // item.store_id = this.store_id

        let liItem = document.querySelector(`#item-${item.id} li`)
        
        liItem.querySelector('.name').innerText = `${item.name}`
        // liItem.remove()
        // debugger
        let wholeItem = document.querySelector(`#item-${item.id}`)
        let liToMoveTo = document.getElementById(`${item.store_id}`)
        liToMoveTo.appendChild(wholeItem)

        // let moveItem = document.createElement("li")
        // moveItem.innerText += liItem.innerHTML
        // liToMoveTo.innerText += moveItem
        
        // moveItem.innerText += liItem.innerHTML
        // debugger
        
        // let oldStoreId = item.store_id
        // let newStoreId = this.store_id
        // let oldStoreId = newStoreId
        

        // debugger
        // fetchItems(this)
        // fetchItems()
        // debugger
        // return oldStoreId
        
        
        
    }

  

    sendPatchItemRequest(itemId){
        const name = document.getElementById(`update-name-${itemId}`).value
        const store_id = document.getElementById(`update-store-${itemId}`).value
        
        
        let itemObj = {
            name,
            store_id
        }
        
        let configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                
            },
            
            body: JSON.stringify(itemObj)
        }
        
        fetch(`http://localhost:3000/items/${itemId}`, configObj)
        .then(res =>  res.json())
        .then(response =>
            
            this.updateItemOnDom(response))
            
            let form = document.getElementById(`update-form-${itemId}`)
            form.remove()
    }

    addUpdateItemFields(itemId){
        let item = document.querySelector(`#item-${itemId} li`)

        let updateForm = `<br>
        <span> 
        Edit Item Name: <input type="text" name="name" value="${this.name}" id="update-name-${itemId}">
        Edit Item Store: <select id="update-store-${itemId}" name="store_id" value="${this.store_id}"></select>
        </span>
        `
        
        

        let formDiv = document.createElement('div')
        formDiv.id = `update-form-${itemId}`
        formDiv.innerHTML = updateForm
        item.append(formDiv)
    }

    handleListClick = (e) => {
        
        let id = e.target.dataset.id
        
        if (e.target.className === "delete"){
            
            deleteItem(id)
        }

        else if (e.target.className === "update-item"){
            
            let itemId = e.target.dataset.id
            e.target.className = "save"
            e.target.innerText = "Save"
            this.addUpdateItemFields(itemId)

            let storeId = this.store_id
            
            let findStore = Store.all.forEach(el => {
                console.log(el.name)
                let storeNames = el.name
                
                let findStore = document.getElementById(`update-store-${itemId}`)
                let option = document.createElement("option")
                option.value = el.id
                
                
                option.innerText = storeNames
                findStore.append(option)
                
            })
            
            return findStore
            
        }
        else if (e.target.className === "save") {
            let itemId = e.target.dataset.id
            

            e.target.className = "update-item"
            e.target.innerText = "Edit Item"
            this.sendPatchItemRequest(itemId)
            // debugger
        }
    }

}