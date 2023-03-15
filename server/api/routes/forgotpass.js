import { Router } from "express";
import { MongoDBConnection } from "../../modules/DBConnection.js";
import * as pr from "../../modules/passwordRecovery.js";
import paramChecker from "../../modules/paramchecker.js";

const forgotPassword = Router();

// route for requesting a password recovery to the given email
forgotPassword.post('/', (req, res) => {
    const missedParams = paramChecker(['email'], req.body);
    const responseFormat = {error: '', code: ''};

    if (missedParams.length > 0) {
        responseFormat.error = `missed_params=${missedParams}`;
        return res.json(responseFormat);
    }

    const mongodbAccounts = new MongoDBConnection();
    mongodbAccounts.setAcceptCallback(userdata => {
        const generatedPassID = pr.generateCPasswordID(req.body.email);
        const generatedPin = pr.generatePin();
        const generatedID = pr.generatePinID(generatedPin, generatedPassID);

        // emails the user
        pr.passwordRecoveryEmail(req.body.email, generatedPin,
            function() {
                responseFormat.code = generatedID;
                res.json(responseFormat);        
            },
            function (err) {
                responseFormat.error = 'SMTPServerError';
                res.json(responseFormat);
            });
    });

    mongodbAccounts.setRejectCallback(error => {
        responseFormat.error = 'NonexistentUser';
        return res.json(responseFormat);
    });

    mongodbAccounts.checkStudentUser(req.body.email);
});

// route for checking if the pin is correct
forgotPassword.post('/pin/:id', (req, res) => {
    const missedParams = paramChecker(['pin'], req.body);
    const responseFormat = {error: '', confirmed: false, key: ''};

    if (missedParams.length > 0) {
        responseFormat.error = `missed_params=${missedParams}`;
        return res.json(responseFormat);
    }

    console.log(req.params.id);

    if (pr.recoveryMap[req.params.id].pin == req.body.pin) {
        responseFormat.key = pr.getPinKey(req.params.id);
        responseFormat.confirmed = true;
        pr.remove(req.params.id);
        res.json(responseFormat);
    } else {
        responseFormat.error = 'InvalidPin';
        res.json(responseFormat);
    }
});

// route for actual changing of password
forgotPassword.post('/change/:id', (req, res) => {
    const missedParams = paramChecker(['password'], req.body);
    const responseFormat = {error: '', changed: false};

    if (missedParams.length > 0) {
        responseFormat.error = `missed_params=${missedParams}`;
        return res.json(responseFormat);
    }

    const dbConnection = new MongoDBConnection();
    dbConnection.setAcceptCallback(userdata => {
        responseFormat.changed = true;
        pr.passchanged(req.params.id);
        res.json(responseFormat);
    });

    dbConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    dbConnection.changePass(req.params.id, req.body.password)
});

export default forgotPassword;