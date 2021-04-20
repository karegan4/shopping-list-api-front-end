class Store {
    static all = []

    constructor({id, name}){
            this.id = id
        this.name = name
        this.element = document.createElement('li')
        this.element.id = `store-${id}`
        this.storeList = document.getElementById('list')

        Store.all.push(this)
    }

    // addToDom(){
    //     this.storeList.append(this.fullRender())
    //     this.addEventListeners()
    // }

    // addEventListeners(){
    //     this.element.addEventListener('click', this.displayItems)
    // }

    
    
}