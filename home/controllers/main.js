var sp = new ProductService();
var cart = [];
var cartItem = {
     product:{
          id : 1,
          price: 100,
          name: 'samsung a10'
     },
     quanlity :1
}
var productList={

}

function getDataUI() {
     sp.getDataProduct()
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

function hienThiDS(mangSP) {
     var content = "";
     mangSP.map(function (sp, index) {
          content += `
         <div class="product-item">
                         <div class="product-img">
                              <img src=${sp.img} alt="">
                         </div>
                         <div class="product-title">
                              <h3 class="product-name">${sp.name}</h3>
                              <p class="product-desc">
                              ${sp.desc}
                              </p><div class="product-price">
                              ${sp.price} <span>$</span>
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

function onchangeSearch() {
     var seach = document.getElementById("produc-sp").value;
     let arr = [];
     let arr2 = [];
     sp.getDataProduct()
          .then((result) => {
               arr = [...result.data];
               arr.map((sp, index) => {
                    if (sp.type == seach) {
                         arr2.push(arr[index]);
                    }
               });
               if (arr2.length == 0) {
                    arr2 = [...arr];
                    alert(`"không có ${seach}"`);
               }
               hienThiDS(arr2);
          }).catch((err) => {
               console.log(err);
          });
}








/**
 * 
 * 
 function addCart(id) {
      var find_Products = findProduct(id);
      var productCart = {
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
      var find_Product = -1;
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