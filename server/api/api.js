import { Router } from "express";

import register from "./routes/register.js";
import verify from "./routes/verify.js";
import login from "./routes/login.js";

import getUnits from "./routes/slots/getUnits.js";
import addUnit from "./routes/slots/addUnits.js";

import addBilling from "./routes/billing/addBilling.js";

const api = Router();
api.use("/register", register);
api.use("/verify", verify);
api.use("/login", login);

api.use("/units", getUnits);
api.use("/units", addUnit);

api.use("/bill", addBilling);

export default api;