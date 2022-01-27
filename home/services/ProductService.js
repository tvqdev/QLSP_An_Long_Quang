function ProductService() {
     this.getDataProduct = function () {
          return axios({
               method: 'GET',
               url: 'https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP',
          });
     }

     this.getDataSearch = function (id) {
          return axios({
               method: 'GET',
               url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP/${id}`,
          });
     }


}
