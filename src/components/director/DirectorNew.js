import React, { useState } from 'react'
import { createDirector } from '../../services/directorService'


export const DirectorNew = ( { handleOpenModal, listarDirectores } ) => {
  const [director, setDirector] = useState({
    nombre: '',
    descripcion: '',
    estado: '',
    imagen: ''
  });

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleOpenModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDirector({
      ...director,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!director.nombre || !director.estado) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await createDirector(director);
      alert('Director guardado exitosamente');
      
      // Guardar imagen localmente ya que el backend no la maneja
      if (director.imagen && response.data._id) {
        localStorage.setItem(`director_imagen_${response.data._id}`, director.imagen);
      }
      
      // Limpiar el formulario
      setDirector({
        nombre: '',
        descripcion: '',
        estado: '',
        imagen: ''
      });
      
      // Actualizar la lista de directores
      if (listarDirectores) {
        listarDirectores();
      }
      
      // Cerrar el modal
      handleOpenModal();
    } catch (error) {
      console.error('Error al guardar director:', error);
      alert('Error al guardar el director. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Director</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleOpenModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                <input 
                  type="text" 
                  name="nombre"
                  placeholder="Nombre del Director" 
                  className="form-control"
                  value={director.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <input 
                  type="url" 
                  name="imagen"
                  placeholder="URL de la imagen del Director" 
                  className="form-control"
                  value={director.imagen}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <select 
                  className="form-select" 
                  name="estado"
                  aria-label="Estado"
                  value={director.estado}
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
              onClick={handleOpenModal}
            >
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Guardar Director
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
