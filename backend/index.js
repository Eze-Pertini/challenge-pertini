const express = require('express');
const { v4: uuidv4 } = require('uuid'); // genero los ID con laa dependenci uuid
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Guardo en memoria -> se resetea cada vez q inicio
let tasks = [];

// GET - Obtener todas las tareas
app.get('/api/tasks', (req, res) => { // FUNCION CALLBACK -> cliente solicita, respuesta nuestra
  res.json(tasks); // respondo con las tareas guardadas
});

// POST - Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body; // desestructurar

  if (!title || !description) {
    return res.status(400).json({ error: 'Título y descripción son obligatorios.' });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Actualizar una tarea existente
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }

  if (title !== undefined) task.title = title; // con !== solo aactulizo el campo si fue enviado por el cliente
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE - Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) { // SI FINDINDEX NO ENCUENTRA EL ID -> DEVUELVE -1
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }

  const deletedTask = tasks.splice(index, 1); //splice -> borro desde el indice, un elemento
  res.json({ message: 'Tarea eliminada', task: deletedTask[0] });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor activo: http://localhost:${PORT}`);
});
