import React from 'react'

export const ProductoraCard = ({ productora, handleEdit, handleDelete }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title">{productora.nombre}</h5>
            <span className={`badge ${productora.estado === 'activo' ? 'bg-success' : 'bg-danger'} ms-2`}>
              {productora.estado}
            </span>
          </div>
          
          <div className="flex-grow-1">
            <p className="card-text text-muted small mb-2">
              <strong>ID:</strong> {productora._id}
            </p>
            
            {productora.slogan && (
              <p className="card-text text-primary fst-italic mb-2">
                "{productora.slogan}"
              </p>
            )}
            
            {productora.descripcion && (
              <p className="card-text mb-2" style={{ 
                display: '-webkit-box', 
                WebkitLineClamp: 3, 
                WebkitBoxOrient: 'vertical', 
                overflow: 'hidden' 
              }}>
                {productora.descripcion}
              </p>
            )}
            
            <div className="mt-auto">
              {productora.fechaCreacion && (
                <p className="card-text text-muted small mb-1">
                  <strong>Creado:</strong> {new Date(productora.fechaCreacion).toLocaleDateString()}
                </p>
              )}
              
              {productora.fechaActualizacion && (
                <p className="card-text text-muted small mb-0">
                  <strong>Actualizado:</strong> {new Date(productora.fechaActualizacion).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-auto pt-3">
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-warning btn-sm flex-fill"
                onClick={() => handleEdit(productora)}
              >
                <i className="fas fa-edit me-1"></i>
                Editar
              </button>
              <button 
                className="btn btn-outline-danger btn-sm flex-fill"
                onClick={() => handleDelete(productora._id)}
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
