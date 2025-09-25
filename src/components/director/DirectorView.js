import React from 'react'
import { getDirectores, deleteDirector } from '../../services/directorService'
import { useState, useEffect } from 'react'
import { DirectorCard } from './DirectorCard'
import { DirectorNew } from './DirectorNew'
import { DirectorEdit } from './DirectorEdit'


export const DirectorView = () => {
  const [directores, setDirectores] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [directorToEdit, setDirectorToEdit] = useState(null);

  const listDirectores = async () => {
    try {
      const {data} = await getDirectores()
      setDirectores(data)
    } catch (error) {
      console.error("Error al listar directores:", error)
    }
  };

  useEffect(() => {
    listDirectores()
  }, [])

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleEdit = (director) => {
    setDirectorToEdit(director);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setDirectorToEdit(null);
  };

  const handleDelete = async (directorId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este director?')) {
      try {
        await deleteDirector(directorId);
        alert('Director eliminado exitosamente');
        listDirectores(); // Refrescar la lista
      } catch (error) {
        console.error('Error al eliminar director:', error);
        alert('Error al eliminar el director. Por favor, intente nuevamente.');
      }
    }
  };

  return (
        <div className="container mt-4 mb-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {
          directores.map(director => {
            return <DirectorCard 
              key={director._id} 
              director={director} 
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          })
        }
      </div>
      
      {/* Modal para agregar director */}
      {
        openModal && <DirectorNew 
          handleOpenModal={handleOpenModal} 
          listarDirectores={listDirectores} 
        />
      }
      
      {/* Modal para editar director */}
      {
        openEditModal && <DirectorEdit 
          director={directorToEdit}
          handleCloseModal={handleCloseEditModal} 
          listarDirectores={listDirectores} 
        />
      }
      
      {/* Botón flotante para agregar */}
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
