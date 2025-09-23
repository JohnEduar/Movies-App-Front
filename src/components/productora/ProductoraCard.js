import React from 'react'

export const ProductoraCard = ({ productora, handleEdit, handleDelete }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      <div className="col">
        <div className="card">
          <img src={productora.image} className="card-img-top" alt={productora.name} />
          <div className="card-body">
            <p className="card-text">{`ID: ${productora._id}`}</p>
            <p className="card-text">{`Nombre: ${productora.nombre}`}</p>
            <p className="card-text">{`Slogan: ${productora.slogan}`}</p>
            <p className="card-text">{`Descripción: ${productora.descripcion}`}</p>
            <p className="card-text">{`Estado: ${productora.estado}`}</p>
            <p className="card-text">{`Fecha de creacion: ${productora.fechaCreacion}`}</p>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <div className="btn-group" role="group">
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm"
                onClick={() => handleEdit(productora)}
                title="Editar productora"
              >
                <i className="fa-solid fa-edit"></i> Editar
              </button>
              <button 
                type="button" 
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(productora._id)}
                title="Eliminar productora"
              >
                <i className="fa-solid fa-trash"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
