import axios from "axios";

const tesloApi = axios.create({

  baseURL: "http://localhost:3000/api",


});


//TODO: Interceptors

// Leer el store de Zustand


export {
  tesloApi,
};