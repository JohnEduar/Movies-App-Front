import React, { useState, useEffect } from 'react'
import { createMedia } from '../../services/mediaService'
import { getGeneros } from '../../services/generoService'
import { getDirectores } from '../../services/directorService'
import { getProductoras } from '../../services/productoraService'
import { getTipos } from '../../services/tipoService'

export const MediaNew = ({ handleOpenModal, listarMedias }) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
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

  // Estados para las opciones de los select
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar todas las opciones al montar el componente
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [generosRes, directoresRes, productorasRes, tiposRes] = await Promise.all([
          getGeneros(),
          getDirectores(),
          getProductoras(),
          getTipos()
        ]);

        setGeneros(generosRes.data || []);
        setDirectores(directoresRes.data || []);
        setProductoras(productorasRes.data || []);
        setTipos(tiposRes.data || []);
      } catch (error) {
        console.error('Error al cargar opciones:', error);
        alert('Error al cargar las opciones. Por favor, recargue la página.');
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Cerrar modal al hacer clic en el backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleOpenModal();
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.serial.trim()) {
      alert('El serial es obligatorio');
      return;
    }
    if (!formData.titulo.trim()) {
      alert('El título es obligatorio');
      return;
    }
    if (!formData.sinopsis.trim()) {
      alert('La sinopsis es obligatoria');
      return;
    }
    if (!formData.anioEstreno || formData.anioEstreno < 1900 || formData.anioEstreno > 2030) {
      alert('El año de estreno debe estar entre 1900 y 2030');
      return;
    }
    if (!formData.generoPrincipal) {
      alert('Debe seleccionar un género principal');
      return;
    }
    if (!formData.directorPrincipal) {
      alert('Debe seleccionar un director principal');
      return;
    }
    if (!formData.productora) {
      alert('Debe seleccionar una productora');
      return;
    }
    if (!formData.tipo) {
      alert('Debe seleccionar un tipo');
      return;
    }

    try {
      // Preparar datos para enviar
      const dataToSend = {
        serial: formData.serial.trim(),
        titulo: formData.titulo.trim(),
        sinopsis: formData.sinopsis.trim(),
        url: formData.url.trim() || '',
        imagen: formData.imagen.trim() || '',
        anioEstreno: parseInt(formData.anioEstreno, 10),
        generoPrincipal: formData.generoPrincipal,
        directorPrincipal: formData.directorPrincipal,
        productora: formData.productora,
        tipo: formData.tipo
      };

      await createMedia(dataToSend);
      alert('Media creada exitosamente');

      // Limpiar formulario
      setFormData({
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

      // Actualizar lista y cerrar modal
      if (listarMedias) {
        listarMedias();
      }
      handleOpenModal();

    } catch (error) {
      console.error('Error al crear media:', error);
      let errorMessage = 'Error al crear la media. Por favor, intente nuevamente.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      alert(errorMessage);
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
            <h5 className="modal-title">Crear Nueva Media</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleOpenModal}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                
                {/* Serial */}
                <div className="col-md-6">
                  <label htmlFor="serial" className="form-label">Serial *</label>
                  <input 
                    type="text" 
                    className="form-control"
                    id="serial"
                    name="serial"
                    placeholder="Ej: MED001"
                    value={formData.serial}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Año de Estreno */}
                <div className="col-md-6">
                  <label htmlFor="anioEstreno" className="form-label">Año de Estreno *</label>
                  <input 
                    type="number" 
                    className="form-control"
                    id="anioEstreno"
                    name="anioEstreno"
                    placeholder="2024"
                    min="1900"
                    max="2030"
                    value={formData.anioEstreno}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Título */}
                <div className="col-12">
                  <label htmlFor="titulo" className="form-label">Título *</label>
                  <input 
                    type="text" 
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    placeholder="Título de la película o serie"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Sinopsis */}
                <div className="col-12">
                  <label htmlFor="sinopsis" className="form-label">Sinopsis *</label>
                  <textarea 
                    className="form-control"
                    id="sinopsis"
                    name="sinopsis"
                    rows="3"
                    placeholder="Descripción de la trama..."
                    value={formData.sinopsis}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* URL */}
                <div className="col-12">
                  <label htmlFor="url" className="form-label">URL</label>
                  <input 
                    type="url" 
                    className="form-control"
                    id="url"
                    name="url"
                    placeholder="https://ejemplo.com/pelicula (opcional)"
                    value={formData.url}
                    onChange={handleChange}
                  />
                </div>

                {/* Imagen */}
                <div className="col-12">
                  <label htmlFor="imagen" className="form-label">URL de Imagen</label>
                  <input 
                    type="url" 
                    className="form-control"
                    id="imagen"
                    name="imagen"
                    placeholder="https://ejemplo.com/imagen.jpg (opcional)"
                    value={formData.imagen}
                    onChange={handleChange}
                  />
                </div>

                {/* Género Principal */}
                <div className="col-md-6">
                  <label htmlFor="generoPrincipal" className="form-label">Género Principal *</label>
                  <select 
                    className="form-select"
                    id="generoPrincipal"
                    name="generoPrincipal"
                    value={formData.generoPrincipal}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un género</option>
                    {generos.map(genero => (
                      <option key={genero.id} value={genero.id}>
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
                    id="directorPrincipal"
                    name="directorPrincipal"
                    value={formData.directorPrincipal}
                    onChange={handleChange}
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
                    id="productora"
                    name="productora"
                    value={formData.productora}
                    onChange={handleChange}
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
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
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
              Crear Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
