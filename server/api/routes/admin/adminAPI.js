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
import studentSummary from "./summary/student.js";
import studentPayment from "./students/payment.js";
import accountSummary from "./summary/account.js";
import setConstants from "./billing/setConstants.js";
import getConstants from "./billing/getConstants.js";
import deleteUnits from "./slots/deleteUnits.js";
import logs from "./logger/logs.js";
import setPrepared from "./names/setPrepared.js";
import setRecieved from "./names/setRecieved.js";
import setReviewed from "./names/setReviewed.js";
import setVerified from "./names/setVerified.js";

const adminPermission = Router();

// units crud operations
adminPermission.use("/slots", getUnits);
adminPermission.use("/slots", addUnit);
adminPermission.use("/slots", deleteUnits);

// bill crud operations
adminPermission.use("/billing", setConstants);
adminPermission.use("/billing", getConstants);
adminPermission.use("/billing", addBilling);
adminPermission.use("/billing", getBillings);
adminPermission.use("/billing", deleteBilling);

// students crud operations
adminPermission.use("/students", verify);
adminPermission.use("/students", unverify);
adminPermission.use("/students", addStudentRoom);
adminPermission.use("/students", deleteStudentRoom);
adminPermission.use("/students", getStudentDetails);
adminPermission.use("/students", studentPayment)

// for summarizing data
adminPermission.use("/summary", roomSummary);
adminPermission.use("/summary", studentSummary);
adminPermission.use("/summary", accountSummary);

// for assigning personel names
adminPermission.use("/names", setPrepared);
adminPermission.use("/names", setRecieved);
adminPermission.use("/names", setReviewed);
adminPermission.use("/names", setVerified);

// for announcement assigning
adminPermission.use("/announce", announce);
adminPermission.use("/logger", logs);

export default adminPermission