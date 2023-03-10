import jwt from "jsonwebtoken";
import paramChecker from "../modules/paramchecker.js";

let initialJSONFormat = {};
let secretKey = process.env.SECRET_KEY;

// sets the initial response json format
export function setJSONPacketFormat(jsonFormat) {
    initialJSONFormat = jsonFormat;
}

// checks if the user has permission to do get request
// by checking the browser's cookies
export function getRequestPermission(req, res, next) {
    const missedParams = paramChecker(["token"], req.cookies);

    if (missedParams.length == 0) {
        try {
            const userData = jwt.verify(req.cookies.token, secretKey);
            req.allowedData = userData.userdata;
            next();

        } catch (error) {
            initialJSONFormat["error"] = "invalid_token";
            res.json(initialJSONFormat);
        }
    } else {
        initialJSONFormat["error"] = `missed_params=${missedParams}`;
        res.json(initialJSONFormat);
    }
}

// checks if the user has permission to do a post request
// by checking its body, if it has valid token assigned
export function postRequestPermission(req, res, next) {
    const missedParams = paramChecker(["token"], req.body);

    if (missedParams.length == 0) {
        try {
            const userData = jwt.verify(req.body.token, secretKey);
            req.allowedData = userData.userdata;
            next();

        } catch (error) {
            initialJSONFormat["error"] = "invalid_token";
            res.json(initialJSONFormat);
        }
    } else {
        initialJSONFormat["error"] = `missed_params=${missedParams}`;
        res.json(initialJSONFormat);
    }
}

//underdevelopment
export function deleteRequestPermission(req, res, next) {
    const missedParams = paramChecker(["token"], req.body);
  
    if (missedParams.length == 0) {
      try {
        const userData = jwt.verify(req.body.token, secretKey);
        req.allowedData = userData.userdata;
        next();
      } catch (error) {
        initialJSONFormat["error"] = "invalid_token";
        res.json(initialJSONFormat);
      }
    } else {
      initialJSONFormat["error"] = `missed_params=${missedParams}`;
      res.json(initialJSONFormat);
    }
  }

  
  
  
  