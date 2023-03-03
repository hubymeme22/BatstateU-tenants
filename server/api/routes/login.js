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
            delete userdata['password'];
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

export default login;