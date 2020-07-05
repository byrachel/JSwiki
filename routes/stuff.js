const express = require('express');
const router = express.Router();
// Import du middleware pour protéger les routes le nécessitant
const isLogged = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');

// Import du middleware MULTER pour gérer l'upload d'images
// const multer = require('../middlewares/multer');

// Import du controller
const stuffCtrl = require('../controllers/stuff');

// Méthode POST pour créer des données via un formulaire
router.post('/create/', stuffCtrl.createPost);

// Methode PUT pour mettre à jour un objet + :id comme paramètre
router.put('/update/:id', isLogged.check, stuffCtrl.modifyPost);

// Méthode DELETE pour supprimer un objet 
router.delete('/delete/:id', isAdmin.check, stuffCtrl.deletePost);

// Méthodes GET qui permettent d'envoyer des données au frontend
router.get('/', stuffCtrl.getAllPosts);
router.get('/:id', stuffCtrl.getOnePost);
router.get('/api/:category', stuffCtrl.getPostsByCategory);
router.get('/:firstname/:lastname', stuffCtrl.getPostsByAuthor);

module.exports = router;