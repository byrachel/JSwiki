// Import de Mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma de données
const postSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true, uniqueCaseInsensitive: true },
  category: { type: String, required: true },
  resum: { type: String, required: true, maxlength: 100  },
  content: { type: String, required: true },
  link: { type: String, required: true },
  like: { type: Number, required: false },
  author: { type: String, required: true },
  authorId: { type: String, required: true },
  date: { type: String, required: true },
  maj: { type: Boolean, required: false},
  majDate: { type: String, required: false},
  majAuthor: { type: String, required: false }
});

// Export du modèle avec les arguments : (nom du modèle, schéma à utiliser)
postSchema.plugin(uniqueValidator, {
  message: 'Error, expected title to be unique.'
});
module.exports = mongoose.model('Post', postSchema);