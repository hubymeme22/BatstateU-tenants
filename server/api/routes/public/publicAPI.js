import { Router } from "express";
import register from "./register.js";
import login from "./login.js";
import checkToken from "./checkToken.js";
import forgotPassword from "./forgotpass.js";

const publicAPI = Router();

publicAPI.use("/register", register);
publicAPI.use("/login", login);
publicAPI.use("/forgotpass", forgotPassword);
publicAPI.use("/check-token", checkToken);

export default publicAPI;