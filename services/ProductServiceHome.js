function ProductServices() {
     this.getDataProduct = function () {
          return axios({
               method: 'GET',
               url: 'https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP',
          });
     }
     this.addDataProduct = function (product) {
          return axios({
               method: 'POST',
               url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP`,
               data: product,
          });
     }
     this.showDataProduct = function (id) {
          return axios({
               method: 'GET',
               url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP/${id}`,
          });
     }
}
