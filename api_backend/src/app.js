import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createRoles, createFirstAdmin } from "./libs/initialSetup.js";

import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/user.routes.js";

const app = express();
createRoles();
createFirstAdmin();


const corsOptions = {
  // origin: "https://mi-front-end.com",
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  optionsSuccessStatus: 204,
  credentials: true,
};
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

export default app;
