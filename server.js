const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// URL de conexión a la base de datos
const url = 'mongodb://localhost:27017';

// Nombre de la base de datos
const dbName = 'mydb';

// Conexión a la base de datos
MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err);
  console.log('Conectado a la base de datos');

  const db = client.db(dbName);

  // Endpoint para obtener todas las tareas
  app.get('/tasks', (req, res) => {
    db.collection('tasks').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });

  // Endpoint para agregar una nueva tarea
  app.post('/tasks', (req, res) => {
    const task = { text: req.body.taskText };
    db.collection('tasks').insertOne(task, (err, result) => {
      if (err) return console.log(err);
      console.log('Tarea agregada a la base de datos');
      res.send('Tarea agregada a la base de datos');
    });
  });

  // Endpoint para cambiar el estado de una tarea
  app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { done: true } };
    db.collection('tasks').updateOne(filter, update, (err, result) => {
      if (err) return console.log(err);
      console.log(`Tarea ${id} actualizada`);
      res.send(`Tarea ${id} actualizada`);
    });
  });

  // Iniciar el servidor
  app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });
});