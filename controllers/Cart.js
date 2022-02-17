export default class Cart{
    constructor(){
        this.arrCart = [];
    }
    deleteCart(id){
        this.arrCart.map((item,index) => { 
            if(item.id === id){
                this.arrCart.splice(index,1)
            }
         })
    }
    updateCart(id,newCartItem){
        this.arrCart.map((item,index) => { 
            if(item.id === id){
                this.arrCart[index] = newCartItem;
            }
         })
    }

}