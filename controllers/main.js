// import Products from "../models/Product.js";
import ProductService from "../services/ProductService.js";
let sp = new ProductService();


let cart = [];
let cartItem = {
     product: {
          id: 1,
          price: 100,
          name: 'samsung a10'
     },
     quanlity: 1
}

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



/**
 * 
 * 
 function addCart(id) {
      let find_Products = findProduct(id);
      let productCart = {
           ...dataProduct[find_Products]
      };
      console.log("product: ", productCart);
 
      if (dataCart.some((pr) => {
           if (pr.product.id == id)
                return true;
      })) {
           dataCart.map((pr) => {
                if (pr.product.id == id) pr.quantity++;
           })
      } else {
           let productItem = new Cart(productCart);
           dataCart.push(productItem);
      }
      console.log(dataCart);
 }
 
 function findProduct(id) {
      let find_Product = -1;
      dataProduct.map((pr, i) => {
           if (pr.id == id) find_Product = i;
      });
      return find_Product;
 }
 
 
 function Carts(mang) {
      let content = "";
      let count = 1;
      mang.map(function (sp) {
           content +=
                `
        <tr>
                <td style="display: flex; align-items: center;"><img style="width: 70px;"
                          src="${sp.product.img}"
                          alt="">${sp.product.name}</td>
                <td><input style="width: 30px; outline: none;" type="number" value="1" min="1"></td>
                <td><span>$ ${sp.product.price}</span></td>
                <td style="cursor: pointer;"><i class="fa fa-trash"></i></td>
           </tr>
          `;
           count++;
      });
      document.querySelector("#tbody").innerHTML = content;
 };
 */