function ProductService() {
  this.layDSSP = function () {
    return axios({
      method: "get",
      url: "https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP"
    });
  };

  this.themSP = function (sp) {
    return axios({
      method: "post",
      url: "https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP",
      data: sp
    });
  };

  this.xoaSP = function(id){
    return axios({
        method: "post",
        url: "https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP",
      });
  }
}
