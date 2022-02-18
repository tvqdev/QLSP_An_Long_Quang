<<<<<<< HEAD
// export default class Cart{
//     constructor(){
//         this.arrCart = [];
//     }
//     deleteCart(id){
//         this.arrCart.map((item,index) => { 
//             if(item.id === id){
//                 this.arrCart.splice(index,1)
//             }
//          })
//     }
//     updateCart(id,newCartItem){
//         this.arrCart.map((item,index) => { 
//             if(item.id === id){
//                 this.arrCart[index] = newCartItem;
//             }
//          })
//     }
=======
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
>>>>>>> refs/remotes/origin/main

// }