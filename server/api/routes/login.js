import { Router } from "express";
import { MongoDBConnection } from "../../modules/DBConnection.js";
import paramChecker from "../../modules/paramchecker.js";
import jwt from 'jsonwebtoken';

const login = Router();
login.post('/', (req, res) => {
    const missedParams = paramChecker(['username', 'password'], req.body);
    const responseFormat = { isLoggedIn: false, error: '', token: ''};

    if (missedParams.length > 0) {
        responseFormat.error = `missed_params=${missedParams}`;
        return res.json(responseFormat);
    }

    const dbConnection = new MongoDBConnection();
    dbConnection.setAcceptCallback(userdata => {
        if (userdata != null) {
            userdata['password'] = 'oh no, why u lookin?';
            responseFormat.token = jwt.sign({userdata}, process.env.SECRET_KEY);
            responseFormat.isLoggedIn = true
            return res.json(responseFormat);
        }

        res.json(responseFormat)
    });

    dbConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    dbConnection.login(req.body.username, req.body.password);
});

// admin login route
login.post('/admin', (req, res) => {
    const missedParams = paramChecker(['email', 'password'], req.body);
    const responseFormat = { isLoggedIn: false, error: '', token: ''};

    if (missedParams.length > 0) {
        responseFormat.error = `missed_params=${missedParams}`;
        return res.json(responseFormat);
    }

    const dbConnection = new MongoDBConnection();
    dbConnection.setAcceptCallback(userdata => {
        if (userdata != null) {
            userdata['password'] = 'oh no, why u lookin?';
            responseFormat.token = jwt.sign({userdata}, process.env.SECRET_KEY);
            responseFormat.isLoggedIn = true
            return res.json(responseFormat);
        }

        res.json(responseFormat)
    });

    dbConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    dbConnection.loginAdmin(req.body.email, req.body.password);
});

export default login;