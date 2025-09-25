import React from 'react'
import { getProductoras, deleteProductora } from '../../services/productoraService'
import { useState, useEffect } from 'react'
import { ProductoraCard } from './ProductoraCard'
import { ProductoraNew } from './ProductoraNew'
import { ProductoraEdit } from './ProductoraEdit'


export const ProductoraView = () => {
  const [productoras, setProductoras] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [productoraToEdit, setProductoraToEdit] = useState(null);

  const listProductoras = async () => {
    try {
      const {data} = await getProductoras()
      setProductoras(data)
    } catch (error) {
      console.error("Error al listar productoras:", error)
    }
  };

  useEffect(() => {
    listProductoras()
  }, [])

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleEdit = (productora) => {
    setProductoraToEdit(productora);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setProductoraToEdit(null);
  };

  const handleDelete = async (productoraId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta productora?')) {
      try {
        await deleteProductora(productoraId);
        alert('Productora eliminada exitosamente');
        listProductoras(); // Refrescar la lista
      } catch (error) {
        console.error('Error al eliminar productora:', error);
        alert('Error al eliminar la productora. Por favor, intente nuevamente.');
      }
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {
          productoras.map(productora => {
            return <ProductoraCard 
              key={productora._id} 
              productora={productora} 
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          })
        }
      </div>
      
      {/* Modal para agregar productora */}
      {
        openModal && <ProductoraNew 
          handleOpenModal={handleOpenModal} 
          listarProductoras={listProductoras} 
        />
      }
      
      {/* Modal para editar productora */}
      {
        openEditModal && <ProductoraEdit 
          productora={productoraToEdit}
          handleCloseModal={handleCloseEditModal} 
          listarProductoras={listProductoras} 
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
