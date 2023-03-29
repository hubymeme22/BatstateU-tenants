import { Router } from "express";
import getStudentDetails from "./details.js";

const studentPermission = Router();

studentPermission.use('/details', getStudentDetails);

export default studentPermission;