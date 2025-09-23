import React from 'react'
import { getMedias, deleteMedia } from '../../services/mediaService'
import { useState, useEffect } from 'react'
import { MediaCard } from './MediaCard'
import { MediaNew } from './MediaNew'
import { MediaEdit } from './MediaEdit'


export const MediaView = () => {
  const [medias, setMedias] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [mediaToEdit, setMediaToEdit] = useState(null);

  const listMedias = async () => {
    try {
      const {data} = await getMedias()
      setMedias(data)
    } catch (error) {
      console.error("Error al listar medias:", error)
    }
  };

  useEffect(() => {
    listMedias()
  }, [])

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleEdit = (media) => {
    setMediaToEdit(media);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setMediaToEdit(null);
  };

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
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {
          medias.map(media => {
            return <MediaCard 
              key={media._id} 
              media={media} 
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          })
        }
      </div>
      
      {/* Modal para agregar media */}
      {
        openModal && <MediaNew 
          handleOpenModal={handleOpenModal} 
          listarMedias={listMedias} 
        />
      }
      
      {/* Modal para editar media */}
      {
        openEditModal && <MediaEdit 
          media={mediaToEdit}
          handleCloseModal={handleCloseEditModal} 
          listarMedias={listMedias} 
        />
      }
      
      {/* Botón flotante para agregar */}
      {
        !openModal && !openEditModal && (
          <button className="btn btn-primary fab" onClick={handleOpenModal}>
            <i className="fa-solid fa-plus"></i>
          </button>
        )
      }
    </div>
  );
}
