import { Router } from "express";
import invoiceLogs from "./invoice.js";

const logs = Router();
logs.use('/invoice', invoiceLogs);
export default logs;