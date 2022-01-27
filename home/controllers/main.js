let sp = new ProductService();

function getDataUI() {
     sp.getDataProduct()
          .then(function (result) {
               hienThiDS(result.data);
               search(result.dataProduct)
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
                              <button class="product-btn">
                                   Add to cart
                              </button>
                         </div>
                    </div>
         `
     });
     document.getElementById("product-content").innerHTML = content;

}

function search(id) {
     var dataProduct = [];
     sp.getDataSearch(id)
          .then(function (result) {
               var datas = result.data.type;
               console.log([result.data.type]);
               for (let i = 0; i < datas.length; i++) {
                    if (datas === "Iphone" || datas === "Samsung") {
                         dataProduct.push(datas[i]);
               hienThiDS(result.data);
                         
                    }               
               }
               hienThiDS(result.data);
          })
          .catch(function (error) {
               console.log(error);
          });  
}