
var User = require('../models/User');

//****** CREATE NEW USER *****//

exports.createUser = (req, res, next) => {

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
    createNewUser.save()
        .then((response) => { res.status(200).json({ newUser : true }) } )
        .catch((error) => res.status(500).json({ newUser: false }))
}

//****** DISPLAY MY ACCOUNT *****//

exports.myAccount = (req, res, next) => {

    User.findOne({ _id: req.user._id }, (error, user) => {
        if (error) {
            console.log(error); reject(error);
        }
        else if (!user) {
            reject(null)
        }
        else {
            res.status(200).json(user)
        }
    });
}

//****** DISPLAY USER PROFILE *****//

exports.userProfile = (req, res, next) => {

    User.findOne({ _id: req.params.id }, (error, user) => {
        if(error) {
            reject(error)
        }
        else {
            res.status(200).json(user)
        }
  })
}

//****** UPDATE USER *****//

exports.updateUser = (req, res, next) => {

    User.updateOne({_id: req.user._id}, {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        website: req.body.website,
        github: req.body.github,
        bio: req.body.bio
    }, function(err) {
        if (err) return next(err);
        User.findOne(req.user._id, function(err, user) {
            if (err) return next(err);
            else res.status(200).json(user);
        });
    });
}