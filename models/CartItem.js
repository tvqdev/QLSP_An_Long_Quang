import Products from "./Products.js";

export default class CartItem extends Products {
    constructor(id, nameSP, price, img, quantity) {
        super(nameSP, price, img);
        this.quantity = quantity;
        this.id = id;
    }
}