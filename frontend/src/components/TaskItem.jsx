function TaskItem({ task, onDelete }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>
        Estado:{" "}
        <strong style={{ color: task.completed ? "green" : "red" }}>
          {task.completed ? "Completada" : "Pendiente"}
        </strong>
      </p>

      <button onClick={() => onDelete(task.id)}>🗑 Eliminar</button>
    </div>
  );
}

export default TaskItem;
