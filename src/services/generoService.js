import { axiosConfig } from "../helpers/axios-config";

const getGeneros = () => {
    return axiosConfig.get("/generos"); 
};

const getGeneroById = (id) => {
    return axiosConfig.get(`/generos/${id}`);
};

const createGenero = (data) => {
    return axiosConfig.post("/generos", data);
};

const updateGenero = (id, data) => {
    return axiosConfig.put(`/generos/${id}`, data);
};

const deleteGenero = (id) => {
    return axiosConfig.delete(`/generos/${id}`);
};

export {
    getGeneros,
    getGeneroById,
    createGenero,
    updateGenero,
    deleteGenero
};
