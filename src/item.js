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

    attachToDom(){
        
        this.itemList.append(this.fullRender())
        
    }

    fullRender(){
        
        this.element.innerHTML = `
        <li>
        <span class="name">${this.name} &nbsp; &nbsp; <button>Edit Item</button> &nbsp; &nbsp; <button> Delete Item </button></span>
        </li><br>
        `
        
        return this.element
        
    }
}