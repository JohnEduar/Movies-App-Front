import React, { useState, useEffect } from 'react'
import { updateDirector } from '../../services/directorService'

export const DirectorEdit = ({ director, handleCloseModal, listarDirectores }) => {
  const [directorData, setDirectorData] = useState({
    nombre: '',
    descripcion: '',
    estado: '',
    imagen: ''
  });

  // Cargar los datos del director cuando el componente se monte
  useEffect(() => {
    if (director) {
      const imagenGuardada = localStorage.getItem(`director_imagen_${director._id}`);
      setDirectorData({
        nombre: director.nombre || '',
        descripcion: director.descripcion || '',
        estado: director.estado || '',
        imagen: director.imagen || imagenGuardada || ''
      });
    }
  }, [director]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDirectorData({
      ...directorData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!directorData.nombre || !directorData.descripcion || !directorData.estado) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      // Guardar imagen localmente ya que el backend no la maneja
      if (directorData.imagen) {
        localStorage.setItem(`director_imagen_${director._id}`, directorData.imagen);
      }
      
      await updateDirector(director._id, directorData);
      alert('Director actualizado exitosamente');
      
      // Actualizar la lista de directores
      if (listarDirectores) {
        listarDirectores();
      }
      
      // Cerrar el modal
      handleCloseModal();
    } catch (error) {
      console.error('Error al actualizar director:', error);
      alert('Error al actualizar el director. Por favor, intente nuevamente.');
    }
  };

  if (!director) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Director</h5>
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
                  placeholder="Nombre del Director" 
                  className="form-control"
                  value={directorData.nombre}
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
                  value={directorData.imagen}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <input 
                  type="text" 
                  name="descripcion"
                  placeholder="Descripcion" 
                  className="form-control"
                  value={directorData.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <select 
                  className="form-select" 
                  name="estado"
                  aria-label="Estado"
                  value={directorData.estado}
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
              Actualizar Director
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
