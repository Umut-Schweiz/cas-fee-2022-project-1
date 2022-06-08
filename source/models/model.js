import mongoose from 'mongoose';
import dbConfig  from '../config/db.config.js';

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

const schema = mongoose.Schema(
    {
        title:String,
        description: String,
        importance:String,
        dueDate:Date,
        finishedState:Boolean,
    },
    { timestamps: true }

);

schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

db.todos = mongoose.model('todos', schema);

export default db;
