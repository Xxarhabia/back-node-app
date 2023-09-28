import express from "express";
import morgan from "morgan";

import { createRoles } from "./libs/initialSetup.js";;

import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/user.routes.js";

const app = express();
createRoles();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

export default app;