
import ProductService from "../services/ProductService.js";

let sp = new ProductService();

let productList = [];

let getDataUI = () => {
     sp.layDSSP()
          .then( result=> {
               hienThiDS(result.data);
               localStorage.setItem("productList", productList)
               productList = result.data;
               console.log(productList);
          })
          .catch( error => {
               console.log(error);
          });
}
getDataUI();

let hienThiDS = (mangSP) => {
     let content = "";
     mangSP.map( (sp, index) =>{
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


let carts = JSON.parse(localStorage.getItem("carts")) || [];


upDateCart();

let addToCart=(id)=> {
     if (carts.some(item => item.id === id)) {
          carts.some(item => {
               if (item.id === id) {
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
     localStorage.setItem("carts", JSON.stringify(carts));
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
                    <button type="button" class="btn minus" style="cursor: pointer" onclick="changeQuatityPlus('${item.id}')">+</button>
                    <div class="number">${item.quantity}</div>
                    <button type="button" class="btn plus" style="cursor: pointer" onclick="changeQuatityMinus('${item.id}')">-</button>
               </td>
               <td><span style="color:chocolate">$${item.price}</span></td>
               <td>
               <button class="icon-delete" type="button" onclick="deleteCart('${item.id}')">
                    <i class="fa fa-trash"></i>
               </button>
               </td>
          </tr>                 
          `
     });
     document.getElementById("tbody").innerHTML = content;
}

function renderToTal() {
     let totalPrice = 0;
     let totalItem = 0;
     carts.forEach((item) => {
          totalPrice += item.price * item.quantity;
          totalItem += item.quantity;
     });
     document.getElementById("priceTotal").innerHTML = '$' + totalPrice;
     document.getElementById('totalItem').innerHTML = totalItem;
}

let changeQuatityPlus = (id) => {
     carts.map(cart => {
          if (cart.id === id) {
               cart.quantity++
          }
     })
     upDateCart();
}
let changeQuatityMinus = (id) => {
     carts.map(cart => {
          if (cart.id === id && cart.quantity > 1) {
               cart.quantity--
          }
     })
     upDateCart();
}
window.changeQuatityPlus = changeQuatityPlus
window.changeQuatityMinus = changeQuatityMinus;

let vitriSP=(id)=> {
     let position = -1;
     carts.map((cart, index) => {
          if (cart.id === id) {
               position = index
          }
     })
     return position
}
window.vitriSP = vitriSP;

let deleteCart=(id)=> {
     let position = vitriSP(id)
     if (position != -1) {
          carts.splice(position, 1)
     }
     upDateCart();
}
window.deleteCart = deleteCart;

document.getElementById("clearTotal").onclick =  ()=> {
     carts = [];
     upDateCart();


}
document.getElementById("purchase").onclick =  ()=> {  
     if (carts.length > 0) {
          Swal.fire({
               title: 'Are you sure?',
               // text: "Tổng tiền",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes'
          }).then((result) => {
               if (result.isConfirmed) {
                    carts = []
                 Swal.fire(
                   'Thanks for payment',
                   '',
                   'success'
                 )
               }
               upDateCart();
             })
     }
}


