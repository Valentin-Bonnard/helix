import User from '../models/user';
import { saltHashPassword } from '../helpers/cryptography';

function create(request, response, next) {

    const email = request.body.email,
        password = request.body.password;

    if (email == "" || password == "") {
        response.status(422).json({
            Conflict: 'Missing Parameters'
        });
    } else {
        var emailPromises = new Promise((resolve1, reject1) => {
            User.findOne({ email: request.body.email }, (error, found) => {
                if (found) {
                    reject1();
                } else {
                    resolve1();
                }
            })
        }).then(() => {
            return new Promise((resolve2, reject2) => {
                let cryptedPassword = saltHashPassword(request.body.password);
                if (cryptedPassword != undefined)
                    resolve2(cryptedPassword);
                else reject2;
            }).then((result) => {
                let user = new User({
                    email: request.body.email,
                    password: result.passwordHash,
                    salt: result.salt
                });
                user.save((error, userSaved) => {
                    if (error)
                        response.send(error);
                    else
                        response.send(userSaved);
                });
            }).catch(function (error) {
                response.status(500).json({
                    Statut: 500,
                    Error: 'Internal Server Error',
                    error: error
                });
            });
        }).catch(function (error) {
            response.status(409).json({
                Statut: 409,
                Conflict: 'This email is already used by a client. Please choose an other.',
                error: error
            });
        });
    };
};

function list(request, response, next) {
    const id = request.param('id'),
        query = {};

    switch (id) {
        case undefined:
            delete query["_id"];
            break;

        default:
            query["_id"] = id;
            break;
    }

    User.find(query, function (error, users) {
        if (error) {
            response.status(500).json({
                Statut: 500,
                Error: "Internal Error ( mongo ) more : " + error
            })
        } else {
            let userMap = {};

            users.forEach(function (user) {
                userMap[user.email] = user;
            }, this);

            response.send(userMap);
        }
    });
};




export default {
    create,
    list
}
