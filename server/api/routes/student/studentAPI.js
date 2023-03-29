import { Router } from "express";
import getStudentBilling from "./billings.js";
import getStudentDetails from "./details.js";

const studentPermission = Router();

studentPermission.use('/details', getStudentDetails);
studentPermission.use('/billing', getStudentBilling);

export default studentPermission;