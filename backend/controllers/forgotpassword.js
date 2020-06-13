
require('dotenv').config();
const nodemailer = require('nodemailer');
var User = require('../models/User');

    router.post('/forgotPassword', function(req, res) {
      let HEROKU_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : 'https://jswikitech.herokuapp.com';
    if (req.body.email === '') {
      res.status(400).send('email required');
    }
    console.error(req.body.email);
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user === null) {
        console.error('email not in database');
        res.status(403).send('email not in db');
      } else {
        // const token = crypto.randomBytes(20).toString('hex');
        // user.update({
        //   resetPasswordToken: token,
        //   resetPasswordExpires: Date.now() + 3600000,
        // });

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
          },
        });

        const mailOptions = {
          from: 'jswiki.tech@gmail.com',
          to: `${user.email}`,
          subject: 'Réinitialisation du mot de passe',
          text:
            'Vous recevez cet email parce que vous avez demandé la réinitialisation de votre mot de passe.\n\n'
            + 'Merci de cliquer sur le lien ci-dessous :\n\n'
            + `${HEROKU_URL}/reset/\n\n`
        };

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
      }
    });
  });
