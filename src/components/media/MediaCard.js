import React from 'react'

export const MediaCard = ({ media, handleEdit, handleDelete }) => {
  return (
    <div className="col">
      <div className="card h-100">
        {media.imagen && (
          <img 
            src={media.imagen} 
            className="card-img-top" 
            alt={media.titulo}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title">{media.titulo}</h5>
            <span className="badge bg-primary ms-2">{media.anioEstreno}</span>
          </div>
          
          <p className="card-text text-muted small mb-2">
            <strong>Serial:</strong> {media.serial}
          </p>
          
          <p className="card-text flex-grow-1" style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 3, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden' 
          }}>
            {media.sinopsis}
          </p>
          
          <div className="mt-auto">
            <div className="row g-2 mb-3">
              <div className="col-6">
                <span className="badge bg-secondary w-100">
                  <i className="fas fa-theater-masks me-1"></i>
                  {media.generoPrincipal?.nombre || 'Sin género'}
                </span>
              </div>
              <div className="col-6">
                <span className="badge bg-info w-100">
                  <i className="fas fa-film me-1"></i>
                  {media.tipo?.nombre || 'Sin tipo'}
                </span>
              </div>
              <div className="col-6">
                <span className="badge bg-warning text-dark w-100">
                  <i className="fas fa-user-tie me-1"></i>
                  {media.directorPrincipal?.nombre || 'Sin director'}
                </span>
              </div>
              <div className="col-6">
                <span className="badge bg-success w-100">
                  <i className="fas fa-building me-1"></i>
                  {media.productora?.nombre || 'Sin productora'}
                </span>
              </div>
            </div>
            
            {media.url && (
              <div className="mb-2">
                <a 
                  href={media.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm w-100"
                >
                  <i className="fas fa-external-link-alt me-1"></i>
                  Ver contenido
                </a>
              </div>
            )}
            
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-warning btn-sm flex-fill"
                onClick={() => handleEdit(media)}
              >
                <i className="fas fa-edit me-1"></i>
                Editar
              </button>
              <button 
                className="btn btn-outline-danger btn-sm flex-fill"
                onClick={() => handleDelete(media._id)}
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
