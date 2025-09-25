import React, { useState, useEffect } from 'react'
import { updateGenero } from '../../services/generoService'

export const GeneroEdit = ({ genero, handleCloseModal, listarGeneros }) => {
  const [generoData, setGeneroData] = useState({
    nombre: '',
    descripcion: '',
    estado: '',
    imagen: ''
  });

  // Cargar los datos del género cuando el componente se monte
  useEffect(() => {
    if (genero) {
      setGeneroData({
        nombre: genero.nombre || '',
        descripcion: genero.descripcion || '',
        estado: genero.estado || '',
        imagen: genero.imagen || ''
      });
    }
  }, [genero]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGeneroData({
      ...generoData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const generoId = genero._id || genero.id; // Usar id o _id
    
    // Validación básica
    if (!generoData.nombre || !generoData.descripcion || !generoData.estado) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      await updateGenero(generoId, generoData);
      alert('Género actualizado exitosamente');
      
      // Actualizar la lista de géneros
      if (listarGeneros) {
        listarGeneros();
      }
      
      // Cerrar el modal
      handleCloseModal();
    } catch (error) {
      console.error('Error al actualizar género:', error);
      alert('Error al actualizar el género. Por favor, intente nuevamente.');
    }
  };

  if (!genero) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Género</h5>
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
                  placeholder="Nombre del Género" 
                  className="form-control"
                  value={generoData.nombre}
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
                  value={generoData.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <input 
                  type="url" 
                  name="imagen"
                  placeholder="URL de la imagen del Género" 
                  className="form-control"
                  value={generoData.imagen}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <select 
                  className="form-select" 
                  name="estado"
                  aria-label="Estado"
                  value={generoData.estado}
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
              Actualizar Género
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
