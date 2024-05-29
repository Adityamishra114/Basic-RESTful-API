const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController.js');
const { check } = require('express-validator');

const router = express.Router();

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.post(
  '/tasks',
  [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required')
  ],
  createTask
);
router.put(
  '/tasks/:id',
  [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required')
  ],
  updateTask
);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
