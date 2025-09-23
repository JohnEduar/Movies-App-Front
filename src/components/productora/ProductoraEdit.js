import React, { useState, useEffect } from 'react'
import { updateProductora } from '../../services/productoraService'

export const ProductoraEdit = ({ productora, handleCloseModal, listarProductoras }) => {
  const [productoraData, setProductoraData] = useState({
    nombre: '',
    slogan: '',
    descripcion: '',
    estado: ''
  });

  // Cargar los datos de la productora cuando el componente se monte
  useEffect(() => {
    if (productora) {
      setProductoraData({
        nombre: productora.nombre || '',
        slogan: productora.slogan || '',
        descripcion: productora.descripcion || '',
        estado: productora.estado || ''
      });
    }
  }, [productora]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductoraData({
      ...productoraData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!productoraData.nombre || !productoraData.slogan || !productoraData.descripcion || !productoraData.estado) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      await updateProductora(productora._id, productoraData);
      alert('Productora actualizada exitosamente');
      
      // Actualizar la lista de productoras
      if (listarProductoras) {
        listarProductoras();
      }
      
      // Cerrar el modal
      handleCloseModal();
    } catch (error) {
      console.error('Error al actualizar productora:', error);
      alert('Error al actualizar la productora. Por favor, intente nuevamente.');
    }
  };

  if (!productora) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Productora</h5>
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
                  placeholder="Nombre de la Productora" 
                  className="form-control"
                  value={productoraData.nombre}
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
                  value={productoraData.slogan}
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
                  value={productoraData.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <select 
                  className="form-select" 
                  name="estado"
                  aria-label="Estado"
                  value={productoraData.estado}
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
              Actualizar Productora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
