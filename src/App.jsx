// App.jsx
import React, { useEffect } from 'react';
import { getAll } from './services/task.service'; 

function App() {
  useEffect(() => {
   
    const fetchTasks = async () => {
      try {
        const tasks = await getAll();
        console.log('Tareas obtenidas:', tasks);
        console.log('Respuesta completa:', JSON.stringify(tasks, null, 2));
      } catch (error) {
        console.error('Error al obtener tareas:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h1>Mi Aplicación de Tareas</h1>
      <p>Revisa la consola para ver las tareas</p>
    </div>
  );
}

export default App;