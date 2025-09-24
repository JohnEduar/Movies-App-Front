import React from 'react'

export const TipoCard = ({ tipo, handleEdit, handleDelete }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title">{tipo.nombre}</h5>
            <span className={`badge ${tipo.estado === 'activo' ? 'bg-success' : 'bg-danger'} ms-2`}>
              {tipo.estado}
            </span>
          </div>
          
          <div className="flex-grow-1">
            <p className="card-text text-muted small mb-2">
              <strong>ID:</strong> {tipo._id}
            </p>
            
            {tipo.descripcion && (
              <p className="card-text mb-2" style={{ 
                display: '-webkit-box', 
                WebkitLineClamp: 3, 
                WebkitBoxOrient: 'vertical', 
                overflow: 'hidden' 
              }}>
                {tipo.descripcion}
              </p>
            )}
            
            <div className="mt-auto">
              {tipo.fechaCreacion && (
                <p className="card-text text-muted small mb-1">
                  <strong>Creado:</strong> {new Date(tipo.fechaCreacion).toLocaleDateString()}
                </p>
              )}
              
              {tipo.fechaActualizacion && (
                <p className="card-text text-muted small mb-0">
                  <strong>Actualizado:</strong> {new Date(tipo.fechaActualizacion).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-auto pt-3">
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-warning btn-sm flex-fill"
                onClick={() => handleEdit(tipo)}
              >
                <i className="fas fa-edit me-1"></i>
                Editar
              </button>
              <button 
                className="btn btn-outline-danger btn-sm flex-fill"
                onClick={() => handleDelete(tipo._id)}
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
