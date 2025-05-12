import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TaskForm({ isEditing = false }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  // Si estamos editando, cargamos la tarea existente
  useEffect(() => {
    if (isEditing) {
      fetch(`http://localhost:3000/api/tasks/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setDescription(data.description);
        })
        .catch(err => console.error("Error al cargar tarea:", err));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = { title, description };

    try {
      const res = await fetch(
        isEditing
          ? `http://localhost:3000/api/tasks/${params.id}`
          : "http://localhost:3000/api/tasks",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        }
      );

      if (res.ok) {
        navigate("/");
      } else {
        console.error("Error al guardar tarea");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? "Editar Tarea" : "Crear Tarea"}</h2>

      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <button type="submit">{isEditing ? "Guardar Cambios" : "Guardar Tarea"}</button>
    </form>
  );
}

export default TaskForm;
