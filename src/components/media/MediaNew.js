import React, { useState, useEffect } from 'react'
import { createMedia } from '../../services/mediaService'
import { getGeneros } from '../../services/generoService'
import { getDirectores } from '../../services/directorService'
import { getProductoras } from '../../services/productoraService'
import { getTipos } from '../../services/tipoService'


export const MediaNew = ( { handleOpenModal, listarMedias } ) => {
  const [media, setMedia] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    anioEstreno: '',
    generoPrincipal: '',
    directorPrincipal: '',
    productora: '',
    tipo: ''
  });

  // Estados para las listas de opciones
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar todas las opciones al montar el componente
  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        const [generosData, directoresData, productorasData, tiposData] = await Promise.all([
          getGeneros(),
          getDirectores(),
          getProductoras(),
          getTipos()
        ]);

        setGeneros(generosData.data || []);
        setDirectores(directoresData.data || []);
        setProductoras(productorasData.data || []);
        setTipos(tiposData.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar opciones:', error);
        setLoading(false);
      }
    };

    cargarOpciones();
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleOpenModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedia({
      ...media,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!media.serial || !media.titulo || !media.sinopsis || !media.url || 
        !media.imagen || !media.anioEstreno || !media.generoPrincipal || 
        !media.directorPrincipal || !media.productora || !media.tipo) {
      alert('Por favor, complete todos los campos');
      return;
    }

    // Convertir anioEstreno a número
    const mediaData = {
      ...media,
      anioEstreno: parseInt(media.anioEstreno)
    };

    try {
      console.log('Datos de media a enviar:', mediaData);
      await createMedia(mediaData);
      alert('Media guardada exitosamente');
      
      // Limpiar el formulario
      setMedia({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        imagen: '',
        anioEstreno: '',
        generoPrincipal: '',
        directorPrincipal: '',
        productora: '',
        tipo: ''
      });
      
      // Actualizar la lista de medias
      if (listarMedias) {
        listarMedias();
      }
      
      // Cerrar el modal
      handleOpenModal();
    } catch (error) {
      console.error('Error al guardar media:', error);
      alert('Error al guardar la media. Por favor, intente nuevamente.');
    }
  };

  if (loading) {
    return (
      <div className="modal-backdrop">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2">Cargando opciones...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Media</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleOpenModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="row g-3" onSubmit={handleSubmit}>
              {/* Serial */}
              <div className="col-md-6">
                <label htmlFor="serial" className="form-label">Serial *</label>
                <input 
                  type="text" 
                  name="serial"
                  id="serial"
                  placeholder="Ej: MED001" 
                  className="form-control"
                  value={media.serial}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Año de Estreno */}
              <div className="col-md-6">
                <label htmlFor="anioEstreno" className="form-label">Año de Estreno *</label>
                <input 
                  type="number" 
                  name="anioEstreno"
                  id="anioEstreno"
                  placeholder="2024" 
                  className="form-control"
                  min="1900"
                  max="2030"
                  value={media.anioEstreno}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Título */}
              <div className="col-12">
                <label htmlFor="titulo" className="form-label">Título *</label>
                <input 
                  type="text" 
                  name="titulo"
                  id="titulo"
                  placeholder="Título de la película o serie" 
                  className="form-control"
                  value={media.titulo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Sinopsis */}
              <div className="col-12">
                <label htmlFor="sinopsis" className="form-label">Sinopsis *</label>
                <textarea 
                  name="sinopsis"
                  id="sinopsis"
                  placeholder="Descripción de la trama..." 
                  className="form-control"
                  rows="3"
                  value={media.sinopsis}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* URL */}
              <div className="col-12">
                <label htmlFor="url" className="form-label">URL *</label>
                <input 
                  type="url" 
                  name="url"
                  id="url"
                  placeholder="https://ejemplo.com/pelicula" 
                  className="form-control"
                  value={media.url}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Imagen */}
              <div className="col-12">
                <label htmlFor="imagen" className="form-label">Imagen (URL) *</label>
                <input 
                  type="url" 
                  name="imagen"
                  id="imagen"
                  placeholder="https://ejemplo.com/imagen.jpg" 
                  className="form-control"
                  value={media.imagen}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Género Principal */}
              <div className="col-md-6">
                <label htmlFor="generoPrincipal" className="form-label">Género Principal *</label>
                <select 
                  className="form-select" 
                  name="generoPrincipal"
                  id="generoPrincipal"
                  value={media.generoPrincipal}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un género</option>
                  {generos.map(genero => (
                    <option key={genero._id} value={genero._id}>
                      {genero.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Director Principal */}
              <div className="col-md-6">
                <label htmlFor="directorPrincipal" className="form-label">Director Principal *</label>
                <select 
                  className="form-select" 
                  name="directorPrincipal"
                  id="directorPrincipal"
                  value={media.directorPrincipal}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un director</option>
                  {directores.map(director => (
                    <option key={director._id} value={director._id}>
                      {director.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Productora */}
              <div className="col-md-6">
                <label htmlFor="productora" className="form-label">Productora *</label>
                <select 
                  className="form-select" 
                  name="productora"
                  id="productora"
                  value={media.productora}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione una productora</option>
                  {productoras.map(productora => (
                    <option key={productora._id} value={productora._id}>
                      {productora.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo */}
              <div className="col-md-6">
                <label htmlFor="tipo" className="form-label">Tipo *</label>
                <select 
                  className="form-select" 
                  name="tipo"
                  id="tipo"
                  value={media.tipo}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  {tipos.map(tipo => (
                    <option key={tipo._id} value={tipo._id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleOpenModal}
            >
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Guardar Media
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
