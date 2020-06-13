const express = require('express');
const router = express.Router();
const passport = require('../helpers/Passport/index');
const User = require('../models/User');
require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

/* Controllers imports */
var newUser = require('../controllers/user');

/* POST new user in collection Mongo. */
router.post('/signup', function(req, res) {
  newUser.createUser(req, res);
});

/* GET display MY account. */
router.get('/myaccount', function(req, res) {
    User.findOne({ _id: req.user._id }, (error, user) => {
        if (error) { console.log(error); reject(error); }
        else if (!user) reject(null);
        else res.status(200).json(user)
    });
});

// GET display user profile
router.get('/user/:id', function(req, res) {
    User.findOne({ _id: req.params.id }, (error, user) => {
        if(error) { reject(error) }
        else {res.status(200).json(user)}
  })
})

/* POST permet de connecter l'utilisateur. */
router.post('/login', passport.authenticate('local'), function(req, res) {
    var dataUser = req.user;
    if(req.user) {
        console.log(dataUser);
        res.json({
            user: dataUser
        });
    }
});

// Update User
router.put('/update/:id', function(req, res, next) {
    console.log(req.user._id)
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
});

// Déconnecter l'utilisateur
router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
            if (err) {
                    return next(err);
            }
            res.status(200).send('OK');
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
    ).then((res) => {
    console.log(res)
    })
    .catch((err) => console.log(err))
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
            + 'Merci de cliquer sur le lien ci-dessous (valide durant 20 minutes):\n\n'
            + `http://localhost:3000/reset/${token}`
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, res) => {
          if (err) {
            console.error('Une erreur est survenue: ', err);
          } else {
            res.status(200).json('Le mail de réinitialisation a été envoyé.');
          }
        });
      
    
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