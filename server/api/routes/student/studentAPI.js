import { Router } from "express";
import getStudentBilling from "./billings.js";
import getStudentDetails from "./details.js";
import updateInfo from "./updateinfo.js";

const studentPermission = Router();

studentPermission.use('/details', getStudentDetails);
studentPermission.use('/billing', getStudentBilling);
studentPermission.use('/update-info', updateInfo);

export default studentPermission;