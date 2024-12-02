import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/Proyecto_DWI/api", // URL base de tu backend
});

export default api;
