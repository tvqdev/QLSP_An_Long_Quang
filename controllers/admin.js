import Products from "../models/Products.js";
import ProductService from "../services/ProductService.js";
import Validation from "../services/Validation.js";

let productSer = new ProductService();
let validation = new Validation();
let mangSP = [];

let getELE=(id)=> {
  return document.getElementById(id);
}
window.getELE = getELE;


let getListProducts=()=> {
  productSer
    .layDSSP()
    .then( (result)=> {
      console.log(result.data);
      renderTable(result.data);
      let DSSP = result.data;
      let mangInfoSP = DSSP.map((product) => {
        let infoSP = {
          id: product.id,
          tenSP: product.name,
        };
        return infoSP;
      });
      localStorage.setItem("DSSP", JSON.stringify(mangInfoSP));
    })
    .catch( err=> {
      console.log(err);
    });
  if (localStorage.getItem("DSSP") != null) {
    mangSP = JSON.parse(localStorage.getItem("DSSP"));
  }
}
getListProducts();
window.getListProducts = getListProducts;

let creatBtnAdd=()=> {
  let footerEle = document.querySelector("#myModal .modal-footer");
  footerEle.innerHTML = `<button onclick = 'addProducts()' class = 'btn btn-primary'> Thêm Điện Thoại</button>`;
}
window.creatBtnAdd = creatBtnAdd;

let renderTable = mangSP => {
  let content = "";
  let count = 1;
  mangSP.map((sp, index)=> {
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

let addProducts = () => {
  
  let name = getELE("NamePhone").value;
  getELE("NamePhone").disabled = false;

  let price = getELE("gia").value;
  let screen = getELE("manHinh").value;
  let backCamera = getELE("camSau").value;
  let frontCamera = getELE("camTruoc").value;
  let img = getELE("hinhAnh").value;
  let desc = getELE("moTa").value;
  let type = getELE("loaiDT").value;

  let isValid = true;
  isValid &=
    validation.checkEmpty(
      name,
      "tbTenDT",
      "Tên điện thoại không được để trống"
    ) &&
    validation.checkExist(
      name,
      "tbTenDT",
      "Tên điện thoại không được trùng",
      mangSP
    );
  isValid &=
    validation.checkEmpty(price, "tbGiaDT", "Giá không được để trống") &&
    validation.checkPrice(price, "tbGiaDT", "Giá điện thoại phải lớn hơn 0");
  isValid &= validation.checkEmpty(
    screen,
    "tbManHinh",
    "Màn hình không được để trống"
  );
  isValid &= validation.checkEmpty(
    backCamera,
    "tbCameraSau",
    "Camera không được để trống"
  );
  isValid &= validation.checkEmpty(
    frontCamera,
    "tbCameraTruoc",
    "Camera không được để trống"
  );
  isValid &= validation.checkEmpty(
    img,
    "tbHinh",
    "Hình Ảnh không được để trống"
  );
  isValid &= validation.checkSelect(
    "loaiDT",
    "tbLoạiDT",
    "Vui lòng Chọn điện thoại"
  );
  isValid &=
    validation.checkEmpty(desc, "tbMoTa", "Bạn chưa viết mô tả") &&
    validation.checkLength(desc, "tbMoTa", "Mô tả nhập quá 60 ký tự");

  if (isValid) {
    let sp = new Products(
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
      .then(() => {
        getListProducts();
        document.querySelector("#myModal .close").click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
window.addProducts = addProducts;

let deleteProduct=id=> {
  productSer
    .xoaSP(id)
    .then(() => {
      getListProducts();
    })
    .catch( err=> {
      console.log(err);
    });
}
window.deleteProduct = deleteProduct;

let editProduct = id => {
  productSer
    .xemSP(id)
    .then((result) => {
      let { name, price, screen, backCamera, frontCamera, img, desc, type } =
        result.data;
      getELE("NamePhone").value = name;
      getELE("NamePhone").disabled = true;

      getELE("gia").value = price;
      getELE("manHinh").value = screen;
      getELE("camSau").value = backCamera;
      getELE("camTruoc").value = frontCamera;
      getELE("hinhAnh").value = img;
      getELE("moTa").value = desc;
      getELE("loaiDT").value = type;

      document.querySelector("#myModal .modal-footer").innerHTML = `
        <button class='btn btn-success' data-dismiss = "modal" onclick="updateProduct('${id}')" >Cập Nhật</button>
      `;
    })
    .catch( err => {
      console.log(err);
    });
};

window.editProduct = editProduct;

let updateProduct= id=> {
  let name = getELE("NamePhone").value;
  let price = getELE("gia").value;
  let screen = getELE("manHinh").value;
  let backCamera = getELE("camSau").value;
  let frontCamera = getELE("camTruoc").value;
  let img = getELE("hinhAnh").value;
  let desc = getELE("moTa").value;
  let type = getELE("loaiDT").value;

  let isValid = true;
 
  isValid &=
    validation.checkEmpty(price, "tbGiaDT", "Giá không được để trống") &&
    validation.checkPrice(price, "tbGiaDT", "Giá điện thoại phải lớn hơn 0");
  isValid &= validation.checkEmpty(
    screen,
    "tbManHinh",
    "Màn hình không được để trống"
  );
  isValid &= validation.checkEmpty(
    backCamera,
    "tbCameraSau",
    "Camera không được để trống"
  );
  isValid &= validation.checkEmpty(
    frontCamera,
    "tbCameraTruoc",
    "Camera không được để trống"
  );
  isValid &= validation.checkEmpty(
    img,
    "tbHinh",
    "Hình Ảnh không được để trống"
  );
  isValid &= validation.checkSelect(
    "loaiDT",
    "tbLoạiDT",
    "Vui lòng Chọn điện thoại"
  );
  isValid &=
    validation.checkEmpty(desc, "tbMoTa", "Bạn chưa viết mô tả") &&
    validation.checkLength(desc, "tbMoTa", "Mô tả nhập quá 60 ký tự");

  if (isValid) {
    let sp = new Products(
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
      .capNhatSP(id, sp)
      .then((result) => {
        getListProducts();
        document.querySelector("#myModal .close").click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
window.updateProduct = updateProduct;

let resetForm=()=> {
  document.querySelector(".modal-body").reset();
  getELE("NamePhone").disabled = false;
  getELE("tbTenDT").innerHTML = "";
  getELE("tbGiaDT").innerHTML = "";
  getELE("tbManHinh").innerHTML = "";
  getELE("tbCameraSau").innerHTML = "";
  getELE("tbCameraTruoc").innerHTML = "";
  getELE("tbHinh").innerHTML = "";
  getELE("tbMoTa").innerHTML = "";
  getELE("tbLoạiDT").innerHTML = "";
}
window.resetForm = resetForm;
let search = () => {
  let keyword = getELE("inputTK").value;
  productSer.timSP().then((result) => {
    let mangTK = [];
    let mangDSSP = result.data;
    let keywordLower = keyword.toLowerCase();
    mangDSSP.map((sp) => {
      let nameLower = sp.name.toLowerCase();
      let indexName = nameLower.indexOf(keywordLower);
      if (indexName > -1) {
        mangTK.push(sp);
      }
    });
    renderTable(mangTK);
  });
};
// window.search = search;
getELE("basic-addon2").addEventListener("click",search);
getELE("inputTK").addEventListener("keyup",search);

document.querySelector(".close").addEventListener("click", resetForm);
document.querySelector("#myModal").addEventListener("click",  (e)=> {
  if (e.target == e.currentTarget) {
    resetForm();
  }
});
