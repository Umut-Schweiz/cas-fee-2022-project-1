
import express from 'express';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import todoRoutes from './source/routes/routes.todos.js'
import connectDB from './source/models/database.connection.js';

dotenv.config();

const currentDir = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(join(currentDir, '/public/html')));
app.use("/api/todos", todoRoutes);
app.use(express.static(join(currentDir, 'source/public')));

connectDB()
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
