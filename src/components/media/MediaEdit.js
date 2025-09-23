import React, { useState, useEffect } from 'react'
import { updateMedia } from '../../services/mediaService'

export const MediaEdit = ({ media, handleCloseModal, listarMedias }) => {
  const [mediaData, setMediaData] = useState({
    nombre: '',
    descripcion: '',
    estado: ''
  });

  // Cargar los datos de la media cuando el componente se monte
  useEffect(() => {
    if (media) {
      setMediaData({
        nombre: media.nombre || '',
        descripcion: media.descripcion || '',
        estado: media.estado || ''
      });
    }
  }, [media]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMediaData({
      ...mediaData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!mediaData.nombre || !mediaData.descripcion || !mediaData.estado) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      await updateMedia(media._id, mediaData);
      alert('Media actualizada exitosamente');
      
      // Actualizar la lista de medias
      if (listarMedias) {
        listarMedias();
      }
      
      // Cerrar el modal
      handleCloseModal();
    } catch (error) {
      console.error('Error al actualizar media:', error);
      alert('Error al actualizar la media. Por favor, intente nuevamente.');
    }
  };

  if (!media) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Media</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleCloseModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                <input 
                  type="text" 
                  name="nombre"
                  placeholder="Nombre de la Media" 
                  className="form-control"
                  value={mediaData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <input 
                  type="text" 
                  name="descripcion"
                  placeholder="Descripción" 
                  className="form-control"
                  value={mediaData.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <select 
                  className="form-select" 
                  name="estado"
                  aria-label="Estado"
                  value={mediaData.estado}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione Estado</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Actualizar Media
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
