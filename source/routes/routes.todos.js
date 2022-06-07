import express from 'express';
import todoController from '../controllers/todo.controller.js';

const router = express.Router();

router.post("/", todoController.create);

// Retrieve all Todos
router.get("/", todoController.getAll);

// Retrieve a single Todo with id
router.get("/:id", todoController.getById);

// Update a Todo with id
router.put("/:id", todoController.updateById);

// Delete a Todo with id
router.delete("/:id", todoController.deleteTodo);

// Create a new Todo
router.delete("/", todoController.deleteAll);

export default router;