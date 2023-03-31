import { Router } from "express";

import getUnits from "./slots/getUnits.js";
import addUnit from "./slots/addUnits.js";
import addBilling from "./billing/addBilling.js";
import getBillings from "./billing/getBilling.js";
import deleteBilling from "./billing/deleteBilling.js";
import verify from "./students/verify.js";
import addStudentRoom from "./students/addRoom.js";
import deleteStudentRoom from "./students/deleteRoom.js";
import unverify from "./students/unverify.js";
import getStudentDetails from "./students/details.js";
import roomSummary from "./summary/room.js";
import announce from "./announcement/announce.js";

const adminPermission = Router();

// units crud operations
adminPermission.use("/slots", getUnits);
adminPermission.use("/slots", addUnit);

// bill crud operations
adminPermission.use("/billing", addBilling);
adminPermission.use("/billing", getBillings);
adminPermission.use("/billing", deleteBilling);

// students crud operations
adminPermission.use("/students", verify);
adminPermission.use("/students", unverify);
adminPermission.use("/students", addStudentRoom);
adminPermission.use("/students", deleteStudentRoom);
adminPermission.use("/students", getStudentDetails);

// for summarizing data
adminPermission.use("/summary", roomSummary);

// for announcement assigning
adminPermission.use("/announce", announce);

export default adminPermission