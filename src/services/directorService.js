import { axiosConfig } from "../helpers/axios-config";

const getDirectores = () => {
    return axiosConfig.get("/directores"); 
};

const getDirectorById = (id) => {
    return axiosConfig.get(`/directores/${id}`);
};

const createDirector = (data) => {
    return axiosConfig.post("/directores", data);
};

const updateDirector = (id, data) => {
    return axiosConfig.put(`/directores/${id}`, data);
};

const deleteDirector = (id) => {
    return axiosConfig.delete(`/directores/${id}`);
};

export {
    getDirectores,
    getDirectorById,
    createDirector,
    updateDirector,
    deleteDirector
};
