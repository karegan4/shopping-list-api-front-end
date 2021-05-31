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
    }

        fullRender(){
           
        this.element.innerHTML = `
        <div id=store-boxes>
        <h3 id="store-names"><span><u>${this.name} </u>&nbsp; &nbsp; <button class="delete-store" id="delete-${this.id}" data-id="${this.id}">Delete This Store</button></span></h3>
        <br>
        <label id="current-items">Current Items for this Store:</label>
        <br><br>
        <ul class="itemsList" id="itemsList">
        <li class="iListt" id="${this.id}">
        </li>
        
        </ul>
        </div>
        <br><br>
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

    
    
    handleStoreClick = (e) => {
        
        let id = e.target.dataset.id
        
        if (e.target.className === "delete-store"){
            
            deleteStore(id)
        }
    }
    
}
//id="${this.element.id}"