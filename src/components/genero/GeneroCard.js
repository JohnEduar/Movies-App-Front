import React from 'react'

export const GeneroCard = ({ genero, handleEdit, handleDelete }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      <div className="col">
        <div className="card">
          <img src={genero.image} className="card-img-top" alt={genero.name} />
          <div className="card-body">
            <p className="card-text">{`ID: ${genero._id || genero.id}`}</p>
            <p className="card-text">{`Nombre: ${genero.nombre}`}</p>
            <p className="card-text">{`Descripción: ${genero.descripcion}`}</p>
            <p className="card-text">{`Estado: ${genero.estado}`}</p>
            <p className="card-text">{`Fecha de Creación: ${genero.fechaCreacion}`}</p>
            <p className="card-text">{`Fecha de Actualización: ${genero.fechaActualizacion}`}</p>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <div className="btn-group" role="group">
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm"
                onClick={() => handleEdit(genero)}
                title="Editar género"
              >
                <i className="fa-solid fa-edit"></i> Editar
              </button>
              <button 
                type="button" 
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(genero._id)}
                title="Eliminar género"
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
