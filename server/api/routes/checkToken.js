import { Router } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const checkToken = Router();
checkToken.post('/', (req, res) => {
    const token = req.body.token;
    if (token == null)
        return res.json({valid: false, access: '', error: 'TokenParameterNotSet'});

    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) return res.json({valid: false, access: '', error: 'InvalidToken'});
        res.json({valid: true, access: data.userdata.access, error: ''});
    })
});

export default checkToken;