import React, { useState } from 'react'
import { createProductora } from '../../services/productoraService'


export const ProductoraNew = ( { handleOpenModal, listarProductoras } ) => {
  const [productora, setProductora] = useState({
    nombre: '',
    slogan: '',
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
    setProductora({
      ...productora,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!productora.nombre || !productora.slogan || !productora.descripcion || !productora.estado) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      await createProductora(productora);
      alert('Productora guardada exitosamente');
      
      // Limpiar el formulario
      setProductora({
        nombre: '',
        slogan: '',
        descripcion: '',
        estado: ''
      });
      
      // Actualizar la lista de productoras
      if (listarProductoras) {
        listarProductoras();
      }
      
      // Cerrar el modal
      handleOpenModal();
    } catch (error) {
      console.error('Error al guardar productora:', error);
      alert('Error al guardar la productora. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Productora</h5>
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
                  placeholder="Nombre de la Productora" 
                  className="form-control"
                  value={productora.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <input 
                  type="text" 
                  name="slogan"
                  placeholder="Slogan de la Productora" 
                  className="form-control"
                  value={productora.slogan}
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
                  value={productora.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <select 
                  className="form-select" 
                  name="estado"
                  aria-label="Estado"
                  value={productora.estado}
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
              Guardar Productora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
