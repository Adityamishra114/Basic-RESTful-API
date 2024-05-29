const { v4: uuidv4 } = require('uuid');
const tasks = require('../models/task');
const { validationResult } = require('express-validator');

// Get all tasks
const getAllTasks = (req, res) => {
  res.status(200).json(tasks);
};

// Get task by ID
const getTaskById = (req, res) => {
  const { id } = req.params;
  const task = tasks.find(task => task.id === id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.status(200).json(task);
};

// Create new task
const createTask = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, groupName, completed = false } = req.body;
  const newTask = { id: uuidv4(), title, description, groupName, completed };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Update task by ID
const updateTask = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, description,groupName, completed } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  const updatedTask = { ...tasks[taskIndex], title, description,groupName, completed };
  tasks[taskIndex] = updatedTask;
  res.status(200).json(updatedTask);
};

// Delete task by ID
const deleteTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
