import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newTask = {
    title,
    description,
  };

  try {
    const res = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    });

    const data = await res.json();
    console.log("Respuesta del backend:", data);

    if (res.ok) {
      navigate("/");
    } else {
      console.error("Error al crear tarea");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Tarea</h2>

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

      <button type="submit">Guardar Tarea</button>
    </form>
  );
}

export default TaskForm;
