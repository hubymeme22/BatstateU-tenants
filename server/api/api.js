import { Router } from "express";
import publicAPI from "./routes/public/publicAPI.js"
import adminAPI from "./routes/admin/adminAPI.js";
import studentAPI from './routes/student/studentAPI.js';

const api = Router();

api.use("/", publicAPI);
api.use("/admin", adminAPI);
api.use("/student", studentAPI);

export default api;