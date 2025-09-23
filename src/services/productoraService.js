import { axiosConfig } from "../helpers/axios-config";

const getProductoras = () => {
    return axiosConfig.get("/productoras"); 
};

const getProductoraById = (id) => {
    return axiosConfig.get(`/productoras/${id}`);
};

const createProductora = (data) => {
    return axiosConfig.post("/productoras", data);
};

const updateProductora = (id, data) => {
    return axiosConfig.put(`/productoras/${id}`, data);
};

const deleteProductora = (id) => {
    return axiosConfig.delete(`/productoras/${id}`);
};

export {
    getProductoras,
    getProductoraById,
    createProductora,
    updateProductora,
    deleteProductora
};
