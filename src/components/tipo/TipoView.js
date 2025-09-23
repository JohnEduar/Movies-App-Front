import React from 'react'
import { getTipos, deleteTipo } from '../../services/tipoService'
import { useState, useEffect } from 'react'
import { TipoCard } from './TipoCard'
import { TipoNew } from './TipoNew'
import { TipoEdit } from './TipoEdit'


export const TipoView = () => {
  const [tipos, setTipos] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [tipoToEdit, setTipoToEdit] = useState(null);

  const listTipos = async () => {
    try {
      const {data} = await getTipos()
      setTipos(data)
    } catch (error) {
      console.error("Error al listar tipos:", error)
    }
  };

  useEffect(() => {
    listTipos()
  }, [])

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleEdit = (tipo) => {
    setTipoToEdit(tipo);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setTipoToEdit(null);
  };

  const handleDelete = async (tipoId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este tipo?')) {
      try {
        await deleteTipo(tipoId);
        alert('Tipo eliminado exitosamente');
        listTipos(); // Refrescar la lista
      } catch (error) {
        console.error('Error al eliminar tipo:', error);
        alert('Error al eliminar el tipo. Por favor, intente nuevamente.');
      }
    }
  };

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {
          tipos.map(tipo => {
            return <TipoCard 
              key={tipo._id} 
              tipo={tipo} 
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          })
        }
      </div>
      
      {/* Modal para agregar tipo */}
      {
        openModal && <TipoNew 
          handleOpenModal={handleOpenModal} 
          listarTipos={listTipos} 
        />
      }
      
      {/* Modal para editar tipo */}
      {
        openEditModal && <TipoEdit 
          tipo={tipoToEdit}
          handleCloseModal={handleCloseEditModal} 
          listarTipos={listTipos} 
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
