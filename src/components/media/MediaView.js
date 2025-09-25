import React, { useState, useEffect } from 'react'
import { getMedias, deleteMedia } from '../../services/mediaService'
import { MediaCard } from './MediaCard'
import { MediaNew } from './MediaNew'
import { MediaEdit } from './MediaEdit'

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [mediaToEdit, setMediaToEdit] = useState(null);

  // Cargar lista de medias
  const listMedias = async () => {
    try {
      const { data } = await getMedias();
      console.log('📋 Medias recibidas del backend:', data);
      console.log('📸 Primera media con imagen:', data.find(m => m.imagen));
      setMedias(data);
    } catch (error) {
      console.error("Error al listar medias:", error);
    }
  };

  // Cargar medias al montar el componente
  useEffect(() => {
    listMedias();
  }, []);

  // Abrir/cerrar modal de crear
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  // Abrir modal de editar
  const handleEdit = (media) => {
    setMediaToEdit(media);
    setOpenEditModal(true);
  };

  // Cerrar modal de editar
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setMediaToEdit(null);
  };

  // Eliminar media
  const handleDelete = async (mediaId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta media?')) {
      try {
        await deleteMedia(mediaId);
        alert('Media eliminada exitosamente');
        listMedias(); // Refrescar la lista
      } catch (error) {
        console.error('Error al eliminar media:', error);
        alert('Error al eliminar la media. Por favor, intente nuevamente.');
      }
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {medias.map(media => (
          <MediaCard 
            key={media._id} 
            media={media} 
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      
      {/* Modal para crear media */}
      {openModal && (
        <MediaNew 
          handleOpenModal={handleOpenModal} 
          listarMedias={listMedias} 
        />
      )}
      
      {/* Modal para editar media */}
      {openEditModal && (
        <MediaEdit 
          media={mediaToEdit}
          handleCloseModal={handleCloseEditModal} 
          listarMedias={listMedias} 
        />
      )}
      
      {/* Botón flotante para agregar */}
      {!openModal && !openEditModal && (
        <button className="btn btn-primary fab" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i>
        </button>
      )}
    </div>
  );
};
