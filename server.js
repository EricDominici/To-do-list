const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 3000;

// URL de la base de datos de MongoDB
const url = 'mongodb://localhost:27017/todo';

// Conexión a la base de datos de MongoDB
MongoClient.connect(url, (err, client) => {
    if (err) throw err;

    console.log('Conectado a la base de datos');

    const db = client.db('todo');
    const tasks = db.collection('tasks');

    // Ruta para obtener todas las tareas
    app.get('/api/tasks', (req, res) => {
        tasks.find().toArray((err, data) => {
            if (err) throw err;

            res.json(data);
        });
    });

    // Ruta para agregar una nueva tarea
    app.post('/api/tasks', (req, res) => {
        const task = req.body.task;

        tasks.insertOne({ task: task }, (err, result) => {
            if (err) throw err;

            res.json(result.ops[0]);
        });
    });

    app.listen(port, () => console.log(`Servidor en ejecución en el puerto ${port}`));
});

