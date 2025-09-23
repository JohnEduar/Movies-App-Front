import React from 'react'

export const MediaCard = ({ media, handleEdit, handleDelete }) => {
  return (
    <div className="col">
      <div className="card h-100">
        {/* Imagen de la media */}
        <img 
          src={media.imagen} 
          className="card-img-top" 
          alt={media.titulo}
          style={{height: '200px', objectFit: 'cover'}}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen'
          }}
        />
        
        <div className="card-body">
          {/* Título principal */}
          <h5 className="card-title text-primary">{media.titulo}</h5>
          
          {/* Serial y Año */}
          <div className="row mb-2">
            <div className="col-6">
              <small className="text-muted">Serial:</small>
              <p className="mb-0 fw-bold">{media.serial}</p>
            </div>
            <div className="col-6">
              <small className="text-muted">Año:</small>
              <p className="mb-0 fw-bold">{media.anioEstreno}</p>
            </div>
          </div>

          {/* Sinopsis */}
          <div className="mb-2">
            <small className="text-muted">Sinopsis:</small>
            <p className="card-text" style={{fontSize: '0.9rem'}}>
              {media.sinopsis && media.sinopsis.length > 100 
                ? `${media.sinopsis.substring(0, 100)}...` 
                : media.sinopsis}
            </p>
          </div>

          {/* Relaciones */}
          <div className="row mb-2">
            <div className="col-6">
              <small className="text-muted">Género:</small>
              <p className="mb-0">
                <span className="badge bg-secondary">
                  {media.generoPrincipal?.nombre || 'N/A'}
                </span>
              </p>
            </div>
            <div className="col-6">
              <small className="text-muted">Tipo:</small>
              <p className="mb-0">
                <span className="badge bg-info">
                  {media.tipo?.nombre || 'N/A'}
                </span>
              </p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-12">
              <small className="text-muted">Director:</small>
              <p className="mb-1 fw-semibold">{media.directorPrincipal?.nombre || 'N/A'}</p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-12">
              <small className="text-muted">Productora:</small>
              <p className="mb-1">{media.productora?.nombre || 'N/A'}</p>
            </div>
          </div>

          {/* Información técnica */}
          <div className="mt-3">
            <small className="text-muted d-block">ID: {media._id}</small>
            <small className="text-muted d-block">
              Fecha de creación: {new Date(media.fechaCreacion).toLocaleDateString()}
            </small>
            {media.url && (
              <small className="d-block mt-1">
                <a 
                  href={media.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <i className="fa-solid fa-external-link-alt"></i> Ver media
                </a>
              </small>
            )}
          </div>
        </div>

        <div className="card-footer d-flex justify-content-between align-items-center">
          <div className="btn-group" role="group">
            <button 
              type="button" 
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleEdit(media)}
              title="Editar media"
            >
              <i className="fa-solid fa-edit"></i> Editar
            </button>
            <button 
              type="button" 
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleDelete(media._id)}
              title="Eliminar media"
            >
              <i className="fa-solid fa-trash"></i> Eliminar
            </button>
          </div>
          
          {/* Indicador visual del tipo */}
          <div>
            <span className={`badge ${
              media.tipo?.nombre?.toLowerCase() === 'película' ? 'bg-warning' : 
              media.tipo?.nombre?.toLowerCase() === 'serie' ? 'bg-success' : 
              'bg-primary'
            }`}>
              {media.tipo?.nombre || 'Media'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
