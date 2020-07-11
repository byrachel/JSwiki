const express = require('express');
const router = express.Router();
const passport = require('../helpers/Passport/index');
const User = require('../models/User');
require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

/* Controllers imports */
const userCtrl = require('../controllers/user');

/* POST new user in collection Mongo. */
router.post('/signup', userCtrl.createUser);

/* GET display MY account. */
router.get('/myaccount', userCtrl.myAccount);

// GET display user profile
router.get('/user/:id', userCtrl.userProfile);

/* POST permet de connecter l'utilisateur. */
router.post('/login', passport.authenticate('local'), function(req, res) {
    var dataUser = req.user;
    if(req.user) {
        console.log(dataUser);
        res.json({
            user: dataUser,
            isLogged: true
        });
    }
});

// var user = {
//     // Connexion à un compte existant
//     login: (req, res) => {
//         if (!req.user) {
//             res.status(418).json({ isConnected: false })
//             return;
//         }
//         else {
//             User_model.findOne({ _id: req.user._id }, (error, data) => {
//                 if (error) {
//                     res.status(500).end();
//                     return;
//                 }
//                 res.json({ isLogged: true, user: data });
//             });
//             // res.status(200).json({ isConnected: true });
//         }
//     },

// Update User
router.put('/update/:id', userCtrl.updateUser);

// Déconnecter l'utilisateur
router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
            if (err) {
                    return next(err);
            }
            res.status(200).send({isLogged: false});
    });
});

/*GET all users*/
// router.get('/all', function(req, res, next) {
//     User.find({}, (error, result) => {
//         if(error) {
//             console.log(error);
//             res.status(500).json({message: 'Aucune utilisateur trouvé'});
//             return;
//         }

//         res.json(result);
//         console.log(result);
//     })
// });

// Forget Password
router.post('/forgotPassword', function(req, res) {

    let HEROKU_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : 'https://jswikitech.herokuapp.com/';

    if (req.body.email === '') {
      res.status(400).send('email required');
    }

    const token = crypto.randomBytes(20).toString('hex');

    User.updateOne({
            email: req.body.email,
        },{
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 1200000,
        }
    )
    .then((res) => res.status(200))
    .catch((err) => res.status(500))

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        },
    });
    const mailOptions = {
        from: 'jswiki.tech@gmail.com',
        to: req.body.email,
        subject: 'Réinitialisation du mot de passe',
        text:
        'Vous recevez cet email parce que vous avez demandé la réinitialisation de votre mot de passe.\n\n'
        + 'Merci de cliquer sur le lien ci-dessous afin de créer un nouveau mot de passe pour votre compte :\n\n'
        + `${HEROKU_URL}/reset/${token} \n\n'`
        + 'Attention : ce lien est fonctionnel 20 minutes.'
    };
    transporter.sendMail(mailOptions, (error, response) => {
        if(error){
            console.error(error);
            res.status(400).json({mailSent:false});
        }
        else{
            console.log(response);
            res.status(200).json({mailSent:true});
        }
    })
    
  });

// update password
router.put('/updatepassword', (req, res) => {
    User.findOne({
        // email: req.body.email,
        resetPasswordToken: req.body.resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() }
    }).then(user => {
        if (user == null) {
            res.status(403).send('Ce lien est invalide ou expiré.');
        }
        else if(user != null) {
            User.updateOne({
            password: bcrypt.hashSync(req.body.password, 10),
            resetPasswordToken: '',
            resetPasswordExpires: '',
            })
        .then(() => {
            res.status(200).send({ message: 'mot de passe mis à jour.' });
            });
        } else {
            res.status(401).json('Aucun utilisateur trouvé avec ces données.');
        }
    });
});

module.exports = router;