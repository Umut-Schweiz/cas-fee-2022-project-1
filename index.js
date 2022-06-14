
import express from 'express';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import todoRoutes from './source/routes/routes.todos.js'
import connectDB from './source/models/database.connection.js';

const currentDir = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// body-parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(join(currentDir, '/public/html')));
app.use("/api/todos", todoRoutes);
app.use(express.static(join(currentDir, 'source/public')));

connectDB()
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
