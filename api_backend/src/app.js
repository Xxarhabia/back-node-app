import express from "express";
import morgan from "morgan";

import { createRoles } from "./libs/initialSetup.js";;

import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/user.routes.js";

const app = express();
createRoles();

const corsOptions = {
    origin: 'https://mi-front-end.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 204,
    credentials: true,
  };
  

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use(cors(corsOptions));
export default app;