import express from 'express';
import todoController from '../controllers/todo.controller.js';

const router = express.Router();
// create a new todo
router.post("/", todoController.create);

// Retrieve all Todos
router.get("/", todoController.getAll);

// Retrieve a single Todo with id
router.get("/:id", todoController.getById);

// Update a Todo with id
router.put("/:id", todoController.updateById);

// Update finishedState with id
router.patch("/:id", todoController.updateById);

// Delete a Todo with id
router.delete("/:id", todoController.deleteTodo);

// Delete all Todos
router.delete("/", todoController.deleteAll);

export default router;