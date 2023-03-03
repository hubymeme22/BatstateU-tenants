import { Router } from "express";
// import { postRequestPermission, setJSONPacketFormat } from "../../middleware/tokenValidator.js";
import { MongoDBConnection } from "../../modules/DBConnection.js";
import paramChecker from "../../modules/paramchecker.js";

const register = Router();
register.post("/student", (req, res) => {
    const missedParams = paramChecker(['username', 'email', 'password', 'name'], req.body);
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
        if (userdata != null) {
            responseJSONFormat['error'] = 'existing_email';
            return res.json(responseJSONFormat);
        }

        // reuse database instance to generate new request
        databaseConnection.setAcceptCallback((userdata) => {
            responseJSONFormat['created'] = true;
            res.json(responseJSONFormat);
        });

        databaseConnection.setRejectCallback((error) => {
            responseJSONFormat['error'] = error;
            res.json(responseJSONFormat);
        });

        databaseConnection.registerStudent(req.body.username, req.body.email, req.body.password, req.body.name);
    });

    databaseConnection.setRejectCallback((error) => {
        responseJSONFormat['error'] = error;
        res.json({responseJSONFormat});
    });

    databaseConnection.checkUsernameAndEmail(req.body.username, req.body.email);
});

// this route can only be accessed by admin
// setJSONPacketFormat({'existing': false, 'created': false, 'error': ''});
// register.post("/admin", postRequestPermission, (req, res) => {
// });

export default register;