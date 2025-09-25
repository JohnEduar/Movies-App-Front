import React from 'react'
import { getGeneros, deleteGenero } from '../../services/generoService'
import { useState, useEffect } from 'react'
import { GeneroCard } from './GeneroCard'
import { GeneroNew } from './GeneroNew'
import { GeneroEdit } from './GeneroEdit'


export const GeneroView = () => {
  const [generos, setGeneros] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [generoToEdit, setGeneroToEdit] = useState(null);

  const listGeneros = async () => {
    try {
      const {data} = await getGeneros()
      setGeneros(data)
    } catch (error) {
      console.error("Error al listar géneros:", error)
    }
  };

  useEffect(() => {
    listGeneros()
  }, [])

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleEdit = (genero) => {
    setGeneroToEdit(genero);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setGeneroToEdit(null);
  };

  const handleDelete = async (generoId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este género?')) {
      try {
        await deleteGenero(generoId);
        alert('Género eliminado exitosamente');
        listGeneros(); // Refrescar la lista
      } catch (error) {
        console.error('Error al eliminar género:', error);
        alert('Error al eliminar el género. Por favor, intente nuevamente.');
      }
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3">
        {
          generos.map(genero => {
            return <GeneroCard 
              key={genero._id} 
              genero={genero} 
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          })
        }
      </div>
      
      
      {
        openModal && <GeneroNew 
          handleOpenModal={handleOpenModal} 
          listarGeneros={listGeneros} 
        />
      }
      
      
      {
        openEditModal && <GeneroEdit 
          genero={generoToEdit}
          handleCloseModal={handleCloseEditModal} 
          listarGeneros={listGeneros} 
        />
      }
      
      
      {
        !openModal && !openEditModal && (
          <button className="btn btn-primary fab" onClick={handleOpenModal}>
            <i className="fa-solid fa-plus"></i>
          </button>
        )
      }
    </div>
  );
}
