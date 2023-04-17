import { Router } from "express";
import register from "./register.js";
import login from "./login.js";
import checkToken from "./checkToken.js";
import forgotPassword from "./forgotpass.js";
import getNames from "./names/getNames.js";
import setPrepared from "./names/setPrepared.js";
import setReviewed from "./names/setReviewed.js";
import setVerified from "./names/setVerified.js";
import getPreparedSignature from "./signatures/getPrepared.js";
import getReviewedSignature from "./signatures/getReviewed.js";
import getVerifiedSignature from "./signatures/getVerified.js";
import uploadPrepared from "./signatures/uploadPrepared.js";
import uploadReview from "./signatures/uploadReviewed.js";
import uploadVerified from "./signatures/uploadVerified.js";

const publicAPI = Router();

publicAPI.use("/register", register);
publicAPI.use("/login", login);
publicAPI.use("/forgotpass", forgotPassword);
publicAPI.use("/check-token", checkToken);

publicAPI.use("/names", getNames);
publicAPI.use("/names", setPrepared);
publicAPI.use("/names", setReviewed);
publicAPI.use("/names", setVerified);

publicAPI.use("/signatures", getPreparedSignature);
publicAPI.use("/signatures", getReviewedSignature);
publicAPI.use("/signatures", getVerifiedSignature);
publicAPI.use("/signatures", uploadPrepared);
publicAPI.use("/signatures", uploadReview);
publicAPI.use("/signatures", uploadVerified);

export default publicAPI;