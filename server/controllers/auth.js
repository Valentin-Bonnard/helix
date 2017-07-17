import User from '../models/user';
import { sha512 } from '../helpers/cryptography';
import jwt from 'jsonwebtoken';
import config from '../../config/env';

function authenticate(request, response, next) {
    const email = request.body.email;
    User.findOne({
        email: email
    }, function (error, user) {
        if (error) response.send(error);
        let comparePassword = sha512(request.body.password, user.salt);
        
        if (comparePassword.passwordHash == user.password) {
            request.user = user;
            next();
        } else {
            return next();
        }
    });
};

function generateToken(req, res, next) {
    if (!req.user) return next();

    const jwtPayload = {
        id: req.user._id
    };
    const jwtData = {
        expiresIn: config.jwtDuration,
    };
    const secret = config.jwtSecret;
    req.token = jwt.sign(jwtPayload, secret, jwtData);

    next();
}

function respondJWT(req, res) {
    if (!req.user) {
        res.status(401).json({
            error: 'Unauthorized'
        });
    } else {
        res.status(200).json({
            jwt: req.token
        });
    }
}

export default { authenticate, generateToken, respondJWT };