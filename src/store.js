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

    }


    fullRender(){
        this.element.innerHTML = `
        <h3>${this.name}</h3>
        `
        

        return this.element
    }
    
}