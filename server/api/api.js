import { Router } from "express";

import register from "./routes/register.js";
import login from "./routes/login.js";
import getUnits from "./routes/slots/getUnits.js";
import addUnit from "./routes/slots/addUnits.js";
import addBilling from "./routes/billing/addBilling.js";
import verify from "./routes/students/verify.js";

const api = Router();
api.use("/register", register);
api.use("/login", login);

// units crud operations
api.use("/units", getUnits);
api.use("/units", addUnit);

// bill crud operations
api.use("/bill", addBilling);

// students crud operations
api.use("/students", verify);

export default api;