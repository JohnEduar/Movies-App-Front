import React from 'react'
import { getDirectores } from '../../services/directorService'
import { useState, useEffect } from 'react'

export const DirectorView = () => {
  const [directores, setDirectores] = useState([])

  const listDirectores = async () => {
    try {
      const {data} = await getDirectores()
      setDirectores(data)
      console.log(data)
    } catch (error) {
      console.error("Error al listar directores:", error)
    }
  };

  useEffect(() => {
    listDirectores()
  }, [])

  return (
    <div>
      <h1>Directores 1</h1>
      <ul>
        {directores.map(director => (
          <li key={director.id}>{director.name}</li>
        ))}
      </ul>
    </div>
  );
}
