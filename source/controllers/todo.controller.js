import db from '../models/model.js';

const Todo = db.todos;

const create = async (req, res) => {

    try {
        const todo = await new Todo(req.body).save()
        res.send(todo);
    } catch (error) {
        res.send(error);
    }
}

const getAll = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.send(todos);
    } catch (error) {
        res.send(error);
    }
}

const getById = async (req, res) => {
    try {
        const todo = await Todo.findOne(
          { _id: req.params.id },
        );
        res.send(todo);
        
    } catch (error) {
        res.send(error);
    }
}

const updateById = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        res.send(todo);
    } catch (error) {
        res.send(error);
    }
}

const updateFinishedStateById = async (req, res) => {
    try {
        await Todo.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        res.send({
            message: `FinishedState were updated successfully!`
          });
    } catch (error) {
        res.send(error);
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.send(todo);
    } catch (error) {
        res.send(error);
    }
}

const deleteAll = async (req, res) => {
    try {
        await Todo.deleteMany({});
        res.send({
          message: `Todos were deleted successfully!`
        });
    } catch (error) {
        res.send(error);
    }
}

export default {
    create,
    getAll,
    getById,
    updateById,
    deleteTodo,
    deleteAll,
    updateFinishedStateById
}