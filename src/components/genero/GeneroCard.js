import React from 'react'

export const GeneroCard = ({ genero, handleEdit, handleDelete }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title">{genero.nombre}</h5>
            <span className={`badge ${genero.estado === 'activo' ? 'bg-success' : 'bg-danger'} ms-2`}>
              {genero.estado}
            </span>
          </div>
          
          <div className="flex-grow-1">
            <p className="card-text text-muted small mb-2">
              <strong>ID:</strong> {genero._id || genero.id}
            </p>
            
            {genero.descripcion && (
              <p className="card-text mb-2" style={{ 
                display: '-webkit-box', 
                WebkitLineClamp: 3, 
                WebkitBoxOrient: 'vertical', 
                overflow: 'hidden' 
              }}>
                {genero.descripcion}
              </p>
            )}
            
            <div className="mt-auto">
              {genero.fechaCreacion && (
                <p className="card-text text-muted small mb-1">
                  <strong>Creado:</strong> {new Date(genero.fechaCreacion).toLocaleDateString()}
                </p>
              )}
              
              {genero.fechaActualizacion && (
                <p className="card-text text-muted small mb-0">
                  <strong>Actualizado:</strong> {new Date(genero.fechaActualizacion).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-auto pt-3">
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-warning btn-sm flex-fill"
                onClick={() => handleEdit(genero)}
              >
                <i className="fas fa-edit me-1"></i>
                Editar
              </button>
              <button 
                className="btn btn-outline-danger btn-sm flex-fill"
                onClick={() => handleDelete(genero._id || genero.id)}
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
