import { Router } from "express";
import { postRequestPermission, setJSONPacketFormat } from "../../../middleware/tokenValidator.js";
import { MongoDBConnection } from "../../../modules/DBConnection.js";
import { AdminMongoDBConnection } from "../../../modules/AdminDBConnection.js";
import paramChecker from "../../../modules/paramchecker.js";

const register = Router();
register.post("/student", (req, res) => {
    const missedParams = paramChecker(['username', 'email', 'contact', 'password', 'name'], req.body);
    const responseJSONFormat = {
        'created': false,
        'error': ''
    };

    if (missedParams.length > 0) {
        responseJSONFormat['error'] = `missed_params=${missedParams}`;
        return res.json(responseJSONFormat);
    }

    // check if the email is already registered
    const databaseConnection = new MongoDBConnection();
    databaseConnection.setAcceptCallback((userdata) => {
        if (userdata.length > 0) {
            responseJSONFormat['error'] = 'existing_email';
            return res.json(responseJSONFormat);
        }

        // reuse database instance to generate new request
        databaseConnection.setAcceptCallback((userdata) => {
            responseJSONFormat['created'] = true;
            res.json(responseJSONFormat);
        });

        databaseConnection.setRejectCallback((error) => {
            console.log(error);

            responseJSONFormat['error'] = error;
            res.json(responseJSONFormat);
        });

        databaseConnection.registerStudent(req.body.username, req.body.email, req.body.password, req.body.contact, req.body.name);
    });

    databaseConnection.setRejectCallback((error) => {
        responseJSONFormat['error'] = error;
        res.json(responseJSONFormat);
    });

    databaseConnection.checkStudentUserAndEmail(req.body.username, req.body.email);
});

// this route can only be accessed by admin
setJSONPacketFormat({'existing': false, 'created': false, 'error': ''});
register.post("/admin", postRequestPermission, (req, res) => {
    const missedParams = paramChecker(['email', 'contact', 'password', 'name'], req.body);
    const responseJSONFormat = {
        'created': false,
        'error': ''
    };

    if (missedParams.length > 0) {
        responseJSONFormat['error'] = `missed_params=${missedParams}`;
        return res.json(responseJSONFormat);
    }

    // check if the email is already registered
    const databaseConnection = new AdminMongoDBConnection(req.allowedData);
    databaseConnection.setAcceptCallback((userdata) => {
        responseJSONFormat['created'] = true;
        res.json(responseJSONFormat);
    });

    databaseConnection.setRejectCallback((error) => {
        responseJSONFormat['error'] = error;
        res.json(responseJSONFormat);
    });

    databaseConnection.registerAdmin(req.body.email, req.body.contact, req.body.password, req.body.name);
});

export default register;