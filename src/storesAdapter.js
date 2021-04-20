class StoresAdapter{
    constructor(){
        this.baseUrl = 'http://localhost:3000/stores'
    }

    fetchStores(){
        fetch(this.baseUrl)
        .then(res => res.json())
        .then(response => {
            response.data.forEach(el => {
                this.sanitizeAndInitializeStore(el)
            })
        })
    }

    sanitizeAndInitializeStore(data) {
        let store = new Store({id: data.id, ...data.attributes})
        store.attachToDom()
    }
}