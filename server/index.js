const express = require("express");
const bodyParser = require("body-parser");
const app = express();
    // Create a simple in-memory database of tasks
    const tasks = [];
    // Add a middleware to parse JSON data in the request body
    app.use(bodyParser.json());
    // Define a route for creating a new task
    app.post("/tasks", (req, res) => {
        const { title, description, state } = req.body;
    
    if (!title || !description || !state) {
        return res.status(400).json({ error: "Title, description, and state are required." });
    }
    
    const newTask = { title, description, state };
    tasks.push(newTask);
    
    res.status(201).json(newTask);
    });
    // Define a route for getting all tasks
    app.get("/tasks", (req, res) => {
    res.json(tasks);
    });
    // Define a route for getting a single task by ID
    app.get("/tasks/:id", (req, res) => {
        const taskId = parseInt(req.params.id);
        const task = tasks.find(task => task.id === taskId);
        
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }
        
        res.json(task);
    });
    // Define a route for updating a task
    app.put("/tasks/:id", (req, res) => {
        const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    
    if (!task) {
        return res.status(404).json({ error: "Task not found." });
    }
    
    const { title, description, state } = req.body;
    
    if (!title || !description || !state) {
        return res.status(400).json({ error: "Title, description, and state are required." });
    }
    
    task.title = title;
    task.description = description;
    task.state = state;
    
    res.json(task);
    });
    // Define a route for deleting a task
    app.delete("/tasks/:id", (req, res) => {
        const taskId = parseInt(req.params.id);
        const index = tasks.findIndex(task => task.id === taskId);
        
        if (index === -1) {
            return res.status(404).json({ error: "Task not found." });
        }
        
        tasks.splice(index, 1);
        res.status(204).send();
    });
    // Start the server
    app.listen(3000, () => {
    console.log("Server listening on port 3000");
});