import React, { useState, useEffect } from 'react'
import { updateMedia } from '../../services/mediaService'

export const MediaEdit = ({ media, handleCloseModal, listarMedias }) => {
  const [formData, setFormData] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    anioEstreno: ''
  });

  // Cargar los datos de la media cuando el componente se monte
  useEffect(() => {
    if (media) {
      setFormData({
        serial: media.serial || '',
        titulo: media.titulo || '',
        sinopsis: media.sinopsis || '',
        url: media.url || '',
        imagen: media.imagen || '',
        anioEstreno: media.anioEstreno || ''
      });
    }
  }, [media]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Cerrar modal al hacer clic en el backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.serial.trim()) {
      alert('El serial es obligatorio');
      return;
    }
    if (!formData.titulo.trim()) {
      alert('El título es obligatorio');
      return;
    }
    if (!formData.sinopsis.trim()) {
      alert('La sinopsis es obligatoria');
      return;
    }
    if (!formData.anioEstreno || formData.anioEstreno < 1900 || formData.anioEstreno > 2030) {
      alert('El año de estreno debe estar entre 1900 y 2030');
      return;
    }

    try {
      // Preparar datos para enviar (solo campos básicos, manteniendo las relaciones existentes)
      const dataToSend = {
        serial: formData.serial.trim(),
        titulo: formData.titulo.trim(),
        sinopsis: formData.sinopsis.trim(),
        url: formData.url.trim() || '',
        imagen: formData.imagen.trim() || '',
        anioEstreno: parseInt(formData.anioEstreno, 10),
        // Mantener las relaciones existentes sin editarlas
        generoPrincipal: media.generoPrincipal?.id || media.generoPrincipal?._id || media.generoPrincipal,
        directorPrincipal: media.directorPrincipal?._id || media.directorPrincipal,
        productora: media.productora?._id || media.productora,
        tipo: media.tipo?._id || media.tipo
      };

      await updateMedia(media._id, dataToSend);
      alert('Media actualizada exitosamente');

      // Actualizar lista y cerrar modal
      if (listarMedias) {
        listarMedias();
      }
      handleCloseModal();

    } catch (error) {
      console.error('Error al actualizar media:', error);
      let errorMessage = 'Error al actualizar la media. Por favor, intente nuevamente.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      alert(errorMessage);
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
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                
                {/* Serial */}
                <div className="col-12">
                  <label htmlFor="serial" className="form-label">Serial *</label>
                  <input 
                    type="text" 
                    className="form-control"
                    id="serial"
                    name="serial"
                    placeholder="Ej: MED001"
                    value={formData.serial}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Título */}
                <div className="col-12">
                  <label htmlFor="titulo" className="form-label">Título *</label>
                  <input 
                    type="text" 
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    placeholder="Título de la película o serie"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Sinopsis */}
                <div className="col-12">
                  <label htmlFor="sinopsis" className="form-label">Sinopsis *</label>
                  <textarea 
                    className="form-control"
                    id="sinopsis"
                    name="sinopsis"
                    rows="3"
                    placeholder="Descripción de la trama..."
                    value={formData.sinopsis}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* URL */}
                <div className="col-12">
                  <label htmlFor="url" className="form-label">URL</label>
                  <input 
                    type="url" 
                    className="form-control"
                    id="url"
                    name="url"
                    placeholder="https://ejemplo.com/pelicula"
                    value={formData.url}
                    onChange={handleChange}
                  />
                </div>

                {/* Imagen */}
                <div className="col-12">
                  <label htmlFor="imagen" className="form-label">URL de Imagen</label>
                  <input 
                    type="url" 
                    className="form-control"
                    id="imagen"
                    name="imagen"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={formData.imagen}
                    onChange={handleChange}
                  />
                </div>

                {/* Año de Estreno */}
                <div className="col-12">
                  <label htmlFor="anioEstreno" className="form-label">Año de Estreno *</label>
                  <input 
                    type="number" 
                    className="form-control"
                    id="anioEstreno"
                    name="anioEstreno"
                    placeholder="2024"
                    min="1900"
                    max="2030"
                    value={formData.anioEstreno}
                    onChange={handleChange}
                    required
                  />
                </div>

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
  );
};
