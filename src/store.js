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
        
        Store.all.push(this)
    }

    attachToDom(){
        
        this.storeList.append(this.fullRender())
        
        this.addEventListeners()
        
    }

    
   
    addEventListeners(){
        
        let a = document.getElementById(this.allItemsBtnID)
        a.addEventListener('click', this.displayItems)
        
        // this.element.addEventListener('click', this.displayItems)
        
    }

        fullRender(){
           
        this.element.innerHTML = `
        <h3>${this.name}</h3>
        <h3>${this.id}</h3>

        
        
        <button class="all-items" id="all-items-${this.id}">See all Items</button><br><br>
        <ul class="itemsList" id="itemsList">
        <li class="iListt" id="${this.id}">
        </li>
        
        </ul>
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

    
    
}
//id="${this.element.id}"