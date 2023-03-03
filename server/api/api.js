import { Router } from "express";
import register from "./routes/register.js";

const api = Router();
api.use("/register", register);

export default api;