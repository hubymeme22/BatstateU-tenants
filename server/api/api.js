import { Router } from "express";

import register from "./routes/register.js";
import login from "./routes/login.js";
import getUnits from "./routes/slots/getUnits.js";
import addUnit from "./routes/slots/addUnits.js";
import addBilling from "./routes/billing/addBilling.js";
import verify from "./routes/students/verify.js";
import getBillings from "./routes/billing/getBilling.js";
import addStudentRoom from "./routes/students/addRoom.js";
import forgotPassword from "./routes/forgotpass.js";
import deleteBilling from "./routes/billing/deleteBilling.js";

const api = Router();
api.use("/register", register);
api.use("/login", login);
api.use("/forgotpass", forgotPassword);

// units crud operations
api.use("/slots", getUnits);
api.use("/slots", addUnit);

// bill crud operations
api.use("/billing", addBilling);
api.use("/billing", getBillings);
api.use("/billing", deleteBilling);

// students crud operations
api.use("/students", verify);
api.use("/students/room", addStudentRoom);

export default api;