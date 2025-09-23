import React, { useState } from 'react'
import { createGenero } from '../../services/generoService'


export const GeneroNew = ( { handleOpenModal, listarGeneros } ) => {
  const [genero, setGenero] = useState({
    nombre: '',
    descripcion: '',
    estado: ''
  });

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleOpenModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGenero({
      ...genero,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!genero.nombre || !genero.descripcion || !genero.estado) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      await createGenero(genero);
      alert('Género guardado exitosamente');
      
      // Limpiar el formulario
      setGenero({
        nombre: '',
        descripcion: '',
        estado: ''
      });
      
      // Actualizar la lista de géneros
      if (listarGeneros) {
        listarGeneros();
      }
      
      // Cerrar el modal
      handleOpenModal();
    } catch (error) {
      console.error('Error al guardar género:', error);
      alert('Error al guardar el género. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Género</h5>
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
                  placeholder="Nombre del Género" 
                  className="form-control"
                  value={genero.nombre}
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
                  value={genero.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <select 
                  className="form-select" 
                  name="estado"
                  aria-label="Estado"
                  value={genero.estado}
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
              Guardar Género
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
