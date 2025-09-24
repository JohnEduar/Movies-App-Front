import React from 'react'

export const DirectorCard = ({ director, handleEdit, handleDelete }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title">{director.nombre}</h5>
            <span className={`badge ${director.estado === 'activo' ? 'bg-success' : 'bg-danger'} ms-2`}>
              {director.estado}
            </span>
          </div>
          
          <div className="flex-grow-1">
            <p className="card-text text-muted small mb-2">
              <strong>ID:</strong> {director._id}
            </p>
            
            {director.fechaCreacion && (
              <p className="card-text text-muted small mb-2">
                <strong>Fecha de creación:</strong> {new Date(director.fechaCreacion).toLocaleDateString()}
              </p>
            )}
            
            {director.fechaActualizacion && (
              <p className="card-text text-muted small">
                <strong>Última actualización:</strong> {new Date(director.fechaActualizacion).toLocaleDateString()}
              </p>
            )}
          </div>
          
          <div className="mt-auto pt-3">
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-warning btn-sm flex-fill"
                onClick={() => handleEdit(director)}
              >
                <i className="fas fa-edit me-1"></i>
                Editar
              </button>
              <button 
                className="btn btn-outline-danger btn-sm flex-fill"
                onClick={() => handleDelete(director._id)}
              >
                <i className="fas fa-trash me-1"></i>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
