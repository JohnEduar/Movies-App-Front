import React from 'react'

export const GeneroCard = ({ genero, handleEdit, handleDelete }) => {
  return (
    <div className="col">
      <div className="card h-100">
        {/* Contenedor de imagen*/}
        <div style={{ 
          height: '320px',
          overflow: 'hidden',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          {genero.imagen ? (
            <img 
              src={genero.imagen} 
              className="card-img-top" 
              alt={genero.nombre}
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              onError={(e) => {
                console.error('❌ Error cargando imagen de género:', genero.imagen);
                e.target.src = 'https://picsum.photos/300/400?random=' + Math.floor(Math.random() * 1000);
                e.target.style.opacity = '0.8';
              }}
              onLoad={(e) => {
                console.log('✅ Imagen de género cargada exitosamente:', genero.imagen);
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
          ) : (
            <div style={{ 
              color: '#6c757d',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              <i className="bi bi-tag" style={{fontSize: '32px', display: 'block', marginBottom: '8px'}}></i>
              SIN IMAGEN
            </div>
          )}
        </div>
        
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
