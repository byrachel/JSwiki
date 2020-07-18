// Import de Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import de Mongoose Unique Validator qui permet de vérifier qu'une donnée est unique
// Deux utilisateurs ne peuvent pas avoir la même adresse mail par exemple
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma de données
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  bio: { type: String, required: false },
  website: { type: String, required: false },
  admin: { type: Boolean, required: true },
  github: { type: String, required: false },
  stuffCreated: { type: Array, required: false },
  stuffUsed: { type: Array, required: false },
  stuffUpdated: { type: Array, required: false }
});

// PASSWORD : Instancie les 2 méthodes qui permettent :
// 1. Comparer le mot de passe saisi à celui stocké dans la BDD
// 2. Transformer le mot de passe saisi en MDP encrypté
UserSchema.methods = {
      checkPassword: function(inputPassword) {
          return bcrypt.compareSync(inputPassword, this.password);
      },
      hashPassword: function(plainTextPassword) {
          return bcrypt.hashSync(plainTextPassword, 10);
      }}
  // Hook : action qui se réalise en s’accrochant à une autre. Ici le hashage du password a lieu au moment de la création du compte
  UserSchema.pre('save', function(next) {
      if (!this.password) {
          next();
      } else {
          console.log('hash: ' + this.hashPassword(this.password));
          this.password = this.hashPassword(this.password);
          next();
      }
  });

// On applique la méthode Unique Validator au schema
UserSchema.plugin(uniqueValidator);

// Export du modèle avec les arguments : (nom du modèle, schéma à utiliser)
module.exports = mongoose.model('User', UserSchema);