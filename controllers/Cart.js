export default class Cart{
    constructor(){
        arrCart = [];
    }
    deleteCart(id){
        arrCart.map((item,index) => { 
            if(item.id === id){
                arrCart.splice(index,1)
            }
         })
    }
    updateCart(id,newCartItem){
        arrCart.map((item,index) => { 
            if(item.id === id){
                arrCart[index] = newCartItem;
            }
         })
    }

}