let sp = new ProductService();

function getDataUI() {
     sp.getDataProduct()
          .then(function (result) {
               hienThiDS(result.data);
          })
          .catch(function (error) {
               console.log(error);
          });
}
getDataUI();

function hienThiDS(mangSP) {
     console.log(mangSP);
     var content = "";
     mangSP.map(function (sp, index) {
          // content = content + "col-4"
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

// Them sản phẩm vào giỏ hàng
function addCart(id, soLuong) {
     let cart = new Products()
     cart.id = id;
     cart.quantily = soLuong;
     return cart;
}
console.log(addCart('1', 20));




