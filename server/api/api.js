import { Router } from "express";

import register from "./routes/register.js";
import verify from "./routes/verify.js";
import login from "./routes/login.js";

const api = Router();
api.use("/register", register);
api.use("/verify", verify);
api.use("/login", login);

export default api;