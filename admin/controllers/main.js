var productSer = new ProductService();
function getELE(id) {
  return document.getElementById(id);
}

getListProducts();

function getListProducts() {
  productSer
    .layDSSP()
    .then(function (result) {
      console.log(result.data);
      renderTable(result.data);
      // setLocalStorage(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function setLocalStorage(mangSP) {
  localStorage.setItem("DSSP", JSON.stringify(mangSP));
}

function getLocalStorage() {
  var mangKQ = JSON.parse(localStorage.getItem("DSSP"));
  return mangKQ;
}

function creatBtnAdd() {
  var footerEle = document.querySelector(".modal-footer");
  footerEle.innerHTML = `<button onclick = 'addProducts()' class = 'btn btn-primary'> Thêm Điện Thoại</button>`;
}

function renderTable(mangSP) {
  var content = "";
  var count = 1;
  mangSP.map(function (sp, index) {
    content += `
        <tr>
            <td style='display:none'>${count}</td>          
            <td>${sp.name}</td>
            <td>${sp.price}</td>
            <td>${sp.screen}</td>
            <td>
             <img style='width: 100px;' src='${sp.img}'></img> </td>
            <td>${sp.desc}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct('${count}')">Xóa</button>
                <button data-toggle="modal" data-target="#myModal" class="btn btn-primary" onclick="editProduct('${sp.id}')">Xem</button>
            </td>
        </tr>
        `;
    count++;
  });
  getELE("tbodyProducts").innerHTML = content;
}

function addProducts() {
  document.getElementById("NamePhone").disabled = false;
  var name = getELE("NamePhone").value;

  var price = getELE("gia").value;
  var screen = getELE("manHinh").value;
  var backCamera = getELE("camSau").value;
  var frontCamera = getELE("camTruoc").value;
  var img = getELE("hinhAnh").value;
  var desc = getELE("moTa").value;
  var type = getELE("loaiDT").value;

  var sp = new Products(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  productSer
    .themSP(sp)
    .then(function (result) {
      console.log(result);
      // load lại sp khi thêm thành công
      getListProducts();
      document.querySelector("#myModal .close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteProduct(id){
    productSer.xoaSP(id)
    .then(function(){
        getListProducts();
    })
    .catch(function(error){
        console.log(error);
    })
}

function editProduct(id){
  productSer.xemSP(id)
  .then(function(result){   
  getELE("NamePhone").value = result.data.name;
  getELE("NamePhone").disabled = true;

  getELE("gia").value = result.data.price;
  getELE("manHinh").value = result.data.screen;
  getELE("camSau").value = result.data.backCamera;
  getELE("camTruoc").value = result.data.frontCamera;
  getELE("hinhAnh").value = result.data.img;
  getELE("moTa").value = result.data.desc;
  getELE("loaiDT").value = result.data.type;

  document.querySelector("#myModal .modal-footer").innerHTML = `
        <button class='btn btn-success' data-dismiss = "modal" onclick="updateProduct('${id}')" >Cập Nhật</button>
      `;
  })
  .catch(function(err){
    console.log(err);
  });
}

function updateProduct(id){

  var name = getELE("NamePhone").value;
  var price = getELE("gia").value;
  var screen = getELE("manHinh").value;
  var backCamera = getELE("camSau").value;
  var frontCamera = getELE("camTruoc").value;
  var img = getELE("hinhAnh").value;
  var desc = getELE("moTa").value;
  var type = getELE("loaiDT").value;

  var sp = new Products(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  productSer.capNhatSP(id, sp)
    .then(function(result){
      getListProducts();
      document.querySelector("#myModal .close").click()
    })
    .catch(function(err){
      console.log(err);
    });
}
function resetForm() {
  document.querySelector(".modal-body").reset();
  document.querySelector("#NamePhone").disabled = false;
  getELE("tbTenDT").innerHTML = "";
  getELE("tbGiaDT").innerHTML = "";
  getELE("tbManHinh").innerHTML = "";
  getELE("tbCameraSau").innerHTML = "";
  getELE("tbCameraTruoc").innerHTML = "";
  getELE("tbHinh").innerHTML = "";
  getELE("tbMoTa").innerHTML = "";
  getELE("tbLoạiDT").innerHTML = "";

}

document.querySelector(".close").addEventListener("click", resetForm);
document.querySelector("#myModal").addEventListener("click", function (e) {
  if (e.target == e.currentTarget) {
    resetForm();
  }
});
