
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
           method: "delete",
           url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP/${id}`,
         });
     }
     this.xemSP = function (id){
      return axios({
        method: "get",
        url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP/${id}`,
      });
     };
     this.capNhatSP = function(id, sp){
      return axios({
        method: "put",
        url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP/${id}`,
        data: sp,
      });
     };
   }
   