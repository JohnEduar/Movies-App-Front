import { axiosConfig } from "../helpers/axios-config";

const getMedias = () => {
    return axiosConfig.get("/medias"); 
};

const getMediaById = (id) => {
    return axiosConfig.get(`/medias/${id}`);
};

const createMedia = (data) => {
    console.log('Llamando createMedia con:', data);
    console.log('URL completa:', 'http://localhost:4000/api/medias');
    
    // Limpiar data de campos undefined o null
    const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    );
    console.log('Datos limpiados para crear:', cleanData);
    
    return axiosConfig.post("/medias", cleanData);
};

const updateMedia = (id, data) => {
    console.log('Llamando updateMedia con:', { id, data });
    console.log('URL completa:', `http://localhost:4000/api/medias/${id}`);
    
    // Limpiar data de campos undefined o null
    const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    );
    console.log('Datos limpiados:', cleanData);
    
    return axiosConfig.put(`/medias/${id}`, cleanData);
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
