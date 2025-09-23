import React, { useState } from 'react'
import { createTipo } from '../../services/tipoService'


export const TipoNew = ( { handleOpenModal, listarTipos } ) => {
  const [tipo, setTipo] = useState({
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
    setTipo({
      ...tipo,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!tipo.nombre || !tipo.descripcion || !tipo.estado) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      console.log('Datos del tipo a enviar:', tipo);
      const response = await createTipo(tipo);
      console.log('Respuesta del servidor:', response);
      alert('Tipo guardado exitosamente');
      
      // Limpiar el formulario
      setTipo({
        nombre: '',
        descripcion: '',
        estado: ''
      });
      
      // Actualizar la lista de tipos
      if (listarTipos) {
        listarTipos();
      }
      
      // Cerrar el modal
      handleOpenModal();
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Error al guardar el tipo. Por favor, intente nuevamente.';
      
      if (error.response?.data?.message) {
        errorMessage = `Error: ${error.response.data.message}`;
      } else if (error.response?.data?.error) {
        errorMessage = `Error: ${error.response.data.error}`;
      } else if (error.response?.status) {
        errorMessage = `Error ${error.response.status}: ${error.response.statusText || 'Error del servidor'}`;
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      alert(errorMessage);
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Tipo</h5>
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
                  placeholder="Nombre del Tipo" 
                  className="form-control"
                  value={tipo.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <textarea 
                  name="descripcion"
                  placeholder="Descripción del Tipo" 
                  className="form-control"
                  value={tipo.descripcion}
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
                  value={tipo.estado}
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
              Guardar Tipo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
