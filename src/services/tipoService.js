import { axiosConfig } from "../helpers/axios-config";

const getTipos = () => {
    return axiosConfig.get("/tipos"); 
};

const getTipoById = (id) => {
    return axiosConfig.get(`/tipos/${id}`);
};

const createTipo = (data) => {
    return axiosConfig.post("/tipos", data);
};

const updateTipo = (id, data) => {
    return axiosConfig.put(`/tipos/${id}`, data);
};

const deleteTipo = (id) => {
    return axiosConfig.delete(`/tipos/${id}`);
};

export {
    getTipos,
    getTipoById,
    createTipo,
    updateTipo,
    deleteTipo
};
