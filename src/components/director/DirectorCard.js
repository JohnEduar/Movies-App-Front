import React from 'react'

export const DirectorCard = ({ director, handleEdit, handleDelete }) => {
  // Obtener imagen del localStorage si no está en los datos del director
  const imagenUrl = director.imagen || localStorage.getItem(`director_imagen_${director._id}`);
  
  return (
    <div className="col">
      <div className="card h-100">
        {/* Contenedor de imagen con tamaño tipo poster */}
        <div style={{ 
          height: '380px',
          overflow: 'hidden',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          {imagenUrl ? (
            <img 
              src={imagenUrl} 
              className="card-img-top" 
              alt={director.nombre}
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              onError={(e) => {
                console.error('❌ Error cargando imagen de director:', imagenUrl);
                // Mostrar imagen placeholder en lugar de ocultar
                e.target.src = 'https://picsum.photos/300/400?random=' + Math.floor(Math.random() * 1000);
                e.target.style.opacity = '0.8';
              }}
              onLoad={(e) => {
                console.log('✅ Imagen de director cargada exitosamente:', imagenUrl);
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
              <i className="bi bi-person" style={{fontSize: '32px', display: 'block', marginBottom: '8px'}}></i>
              SIN IMAGEN
            </div>
          )}
        </div>
        
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
