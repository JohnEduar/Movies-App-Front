import React, { useState, useEffect } from 'react'
import { updateTipo } from '../../services/tipoService'

export const TipoEdit = ({ tipo, handleCloseModal, listarTipos }) => {
  const [tipoData, setTipoData] = useState({
    nombre: '',
    descripcion: '',
    estado: ''
  });

  // Cargar los datos del tipo cuando el componente se monte
  useEffect(() => {
    if (tipo) {
      setTipoData({
        nombre: tipo.nombre || '',
        descripcion: tipo.descripcion || '',
        estado: tipo.estado || ''
      });
    }
  }, [tipo]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTipoData({
      ...tipoData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!tipoData.nombre || !tipoData.descripcion || !tipoData.estado) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      await updateTipo(tipo._id, tipoData);
      alert('Tipo actualizado exitosamente');
      
      // Actualizar la lista de tipos
      if (listarTipos) {
        listarTipos();
      }
      
      // Cerrar el modal
      handleCloseModal();
    } catch (error) {
      console.error('Error al actualizar tipo:', error);
      alert('Error al actualizar el tipo. Por favor, intente nuevamente.');
    }
  };

  if (!tipo) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Tipo</h5>
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
                  placeholder="Nombre del Tipo" 
                  className="form-control"
                  value={tipoData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <textarea 
                  name="descripcion"
                  placeholder="Descripción del Tipo" 
                  className="form-control"
                  value={tipoData.descripcion}
                  onChange={handleInputChange}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="col-12">
                <select 
                  className="form-select" 
                  name="estado"
                  aria-label="Estado"
                  value={tipoData.estado}
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
              Actualizar Tipo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
