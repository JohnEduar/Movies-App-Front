import React from 'react'

export const TipoCard = ({ tipo, handleEdit, handleDelete }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      <div className="col">
        <div className="card">
          <div className="card-body">
            <p className="card-text">{`ID: ${tipo._id}`}</p>
            <p className="card-text">{`Nombre: ${tipo.nombre}`}</p>
            <p className="card-text">{`Descripción: ${tipo.descripcion}`}</p>
            <p className="card-text">{`Estado: ${tipo.estado}`}</p>
            <p className="card-text">{`Fecha de creacion: ${tipo.fechaCreacion}`}</p>
            <p className="card-text">{`Fecha de actualización: ${tipo.fechaActualizacion}`}</p>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <div className="btn-group" role="group">
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm"
                onClick={() => handleEdit(tipo)}
                title="Editar tipo"
              >
                <i className="fa-solid fa-edit"></i> Editar
              </button>
              <button 
                type="button" 
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(tipo._id)}
                title="Eliminar tipo"
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
