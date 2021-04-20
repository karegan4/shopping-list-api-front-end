class Item {
    static all = []

    constructor({name, id, store_id}) {
        this.name = name
        this.id = id
        this.store_id = store_id
        this.element = document.createElement('div')
        this.element.id = `item-${this.id}`

        Item.all.push(this)
    }
}