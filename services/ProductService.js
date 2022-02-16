import Products from "../models/Product";

export default class ProductService {
  constructor() {};

     layDSSP () {
       return axios({
         method: "get",
         url: "https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP"
       });
     };
   
     themSP (sp) {
       return axios({
         method: "post",
         url: "https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP",
         data: sp
       });
     };
   
     xoaSP (id){
       return axios({
           method: "delete",
           url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP/${id}`,
         });
     }
     xemSP (id){
      return axios({
        method: "get",
        url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP/${id}`,
      });
     };
     capNhatSP(id, sp){
      return axios({
        method: "put",
        url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP/${id}`,
        data: sp,
      });
     };
     timSP(){
       return axios({
         method: 'get',
        url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/QLSP`,
       })
     }
   }
   