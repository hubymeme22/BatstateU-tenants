import { Router } from "express";

import register from "./routes/register.js";
import verify from "./routes/verify.js";

const api = Router();
api.use("/register", register);
api.use("/verify", verify);

export default api;