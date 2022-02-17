// import Products from "../models/Products.js";

import ProductService from "../services/ProductService.js";
import CartItem from "../models/CartItem.js";
import Cart from "../controllers/Cart.js";
let sp = new ProductService();
let cart = new Cart();


let productList = {
}

let getDataUI = () => {
     sp.layDSSP()
          .then(function (result) {
               hienThiDS(result.data);
               localStorage.setItem("productList", productList)
               console.log(productList);
          })
          .catch(function (error) {
               console.log(error);
          });
}
getDataUI();

let hienThiDS = (mangSP) => {
     let content = "";
     mangSP.map(function (sp, index) {
          content += `
         <div class="product-item">
                         <div class="product-img">
                              <img class="img-fluid" src=${sp.img} alt="">
                         </div>
                         <div class="product-title">
                              <h3 class="product-name">${sp.name}</h3>
                              <p class="product-desc">
                              ${sp.desc}
                              </p>
                              <div class="product-price">
                                   Price :   <span class="clr">${sp.price}</span> $
                              </div>
                              
                              <div class="product-screen">
                              Screen :   <span class="clr">${sp.screen} 54</span> 
                         </div>
                         <div class="product-backCamera">
                              Back Camera :    <span class="clr">${sp.backCamera}</span> 
                         </div>
                         <div class="product-frontCamera">
                              Front Camera :   <span class="clr">${sp.frontCamera}</span> 
                         </div>
                              <button class="product-btn" onclick="addCart(${sp.id})">
                                   Add to cart
                              </button>
                         </div>
                    </div>
         `
     });
     document.getElementById("product-content").innerHTML = content;

}
// onchange sản phẩm
 let onchangeSearch =() =>{
     sp.layDSSP()
     .then((result) => {
         let seach = document.querySelector("#produc-sp").value;
         let arr_new = [];
         if (seach === "") {
             arr_new = result.data;
         } else {
             result.data.map((product) => {
                 if (product.type == seach) {
                     arr_new.push(product);
                 }
             })
         }
         hienThiDS(arr_new);
     })
     .catch((error) => {
         console.log(error);
     });
}
document.getElementById("produc-sp").onclick = onchangeSearch;


// them sản phẩm
let themSP = (id) => {
     sp.xemSP(id)
         .then((result) => {
             let arr_Cart = cart.arrCart;
             if (arr_Cart.some((item) => item.id === id)) {
                  result.quanlity++;
             } else {
                 let cartItem = new CartItem(id, result.data.name, result.data.price, result.data.img, 1);
                 arr_Cart.push(cartItem);
             }
          
         })
         .catch((error) => {
             console.log(error);
         });
 
 }
window.themSP = themSP;
