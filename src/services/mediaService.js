import { axiosConfig } from "../helpers/axios-config";

const getMedias = () => {
    return axiosConfig.get("/medias"); 
};

const getMediaById = (id) => {
    return axiosConfig.get(`/medias/${id}`);
};

const createMedia = (data) => {
    return axiosConfig.post("/medias", data);
};

const updateMedia = (id, data) => {
    return axiosConfig.put(`/medias/${id}`, data);
};

const deleteMedia = (id) => {
    return axiosConfig.delete(`/medias/${id}`);
};

export {
    getMedias,
    getMediaById,
    createMedia,
    updateMedia,
    deleteMedia
};
