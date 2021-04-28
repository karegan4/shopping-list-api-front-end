class Store {
    static all = []

    constructor({id, name}){
        this.id = id
        this.name = name
        this.element = document.createElement('li')
        this.element.id = `store-${id}`
        this.storeList = document.getElementById('stores')
        this.sorted = false

        Store.all.push(this)
    }

    attachToDom(){
        this.storeList.append(this.fullRender())
        this.addEventListeners()
    }

    addEventListeners(){
        this.element.addEventListener('click', this.displayItems)
    }


    fullRender(){
        this.element.innerHTML = `
        <h3>${this.name}</h3>
        `
        

        return this.element
    }
    
    get items(){
        return Item.all.filter(i => i.store_id == this.id)
    }

    static find(id) {
        return Store.all.find(c => c.id == id)
    }

    
}