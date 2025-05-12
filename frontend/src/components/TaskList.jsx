import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = () => {
    fetch("http://localhost:3000/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error al cargar tareas:", error));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Volver a cargar la lista de tareas actualizada
        loadTasks();
      } else {
        console.error("Error al eliminar tarea");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>

      {tasks.length === 0 ? (
        <p>No hay tareas por mostrar.</p>
      ) : (
        <div>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
