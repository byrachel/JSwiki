// Récupérer le schéma / modèle
let Post = require('../models/Thing');

// Logique de la route POST : enregistre les données du formulaire addPost
exports.createPost = (req, res, next) => {
  Post.create({
    title: req.body.title,
    category: req.body.category,
    resum: req.body.resum,
    content: req.body.content,
    link: req.body.link,
    like: 0,
    author: req.body.author,
    authorId: req.body.authorId,
    date: req.body.date,
  }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
}

// Logique de la route PUT pour mettre à jour un objet + :id comme paramètre
exports.modifyPost = (req, res, next) => {
  Post.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

// Logique de la route DELETE pour supprimer un objet + :id comme paramètre
exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
  .catch(error => res.status(400).json({ error }));
}

// Logique de la route GET pour afficher un seul objet + :id comme paramètre
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
}

// Logique de la route GET qui permet d'envoyer toutes les données au frontend
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}

// Posts par catégorie
exports.getPostsByCategory = (req, res, next) => {
  let category = req.params.category;
  Post.find({ category })
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}

// Posts par auteur
exports.getPostsByAuthor = (req, res, next) => {
  let author = `${req.params.firstname} ${req.params.lastname}`
  console.log(req.params)
  Post.find({ author })
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}