
import ProductService from "../services/ProductService.js";

let sp = new ProductService();

let productList = [];

let getDataUI = () => {
     sp.layDSSP()
          .then(function (result) {
               hienThiDS(result.data);
               localStorage.setItem("productList", productList)
               productList = result.data;
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
                              <button class="product-btn" onclick="addToCart('${sp.id}')">
                                   Add to cart
                              </button>
                         </div>
                    </div>
         `
     });
     document.getElementById("product-content").innerHTML = content;

}
// onchange sản phẩm
let onchangeSearch = () => {
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


let carts = JSON.parse(localStorage.getItem("CART")) || [];
upDateCart();

function addToCart(id) {

     if (carts.some(item => item.id === id)) {
          carts.some(item => {
               if (item.id === id){
                    item.quantity++;
               }
          })
     }
     else {
          const item = productList.find(sp => sp.id === id);
          carts.push({
               ...item,
               quantity: 1,
          });
          
     }
     upDateCart();
}

window.addToCart = addToCart;

function upDateCart() {
     renderCartItem();
     renderToTal();

     localStorage.setItem("CART", JSON.stringify(carts));
}

function renderCartItem() {
     let content = "";
     carts.forEach(item => {
          content += `
          <tr>
               <td style="display: flex; align-items: center;"><img style="width: 70px;"
                    src=${item.img}
                    alt="">${item.name}</td>
               <td>
                    <div class="btn minus" style="cursor: pointer" onclick="changeQuatity(${item.id})">-</div>
                    <div class="number">${item.quantity}</div>
                    <div class="btn plus" style="cursor: pointer" onclick="changeQuatity(${item.id})">+</div>
               </td>
               <td><span>$${item.price}</span></td>
               <td style="cursor: pointer;"><i class="fa fa-trash"></i></td>
          </tr>                 
          `
     });
     document.getElementById("tbody").innerHTML = content;
}

function renderToTal(){
     let totalPrice = 0;

     carts.forEach((item) => {
          totalPrice += item.price * item.quantity;
     });
     document.getElementById("priceTotal").innerHTML = '$' + totalPrice;
}

function changeQuatity(action, id){
     carts = carts.map((item) => {
          let quantity = item.quantity;
          if (item.id === id){
               if(action === "minus" && quantity > 1){
                    quantity++;
                    
               }
               else if(action === "plus" && quantity < item.instock) {
                    quantity--;
                    
               }
          }
          return {
               ...item,
               quantity,
          };
     });
     upDateCart();
}
window.changeQuatity = changeQuatity;




