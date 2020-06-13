
var User = require('../models/User');

var newUser = {

    createUser: (req, res) => {
        var userData = req.body.user;
        var createNewUser = new User ({
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            password: userData.password,
            admin: false,
            website: userData.website,
            github: userData.github
        }
        );
        createNewUser.save((error) => {
            if(error) {
                res.status(500).json({message: "Oups ! "});
                return;
            }
            res.json({message: "Great! Your account is created. Now you can login and start your journey. Have fun..."});
        });
    },

}

module.exports = newUser;