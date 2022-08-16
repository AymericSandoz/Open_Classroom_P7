const express = require('express');
const router = express.Router(); //création d'un routeur express dans lequel on va enregistrer nos routes

//Importations des middleware
const auth = require('../middleware/auth'); //authentifications
const multer = require('../middleware/multer-config'); //gestions des images

//Importation controllers
const stuffCtrl = require('../controllers/post');

//Routes

router.get('/', stuffCtrl.getAllPosts); //Récupération de toute les sauces
router.post('/', multer, stuffCtrl.createPost); //Création de post
router.get('/:id', stuffCtrl.getOnePost); //Récupération d'une sauce
router.put('/:id', stuffCtrl.modifyPost); //modifiation d'une sauce
router.delete('/:id', stuffCtrl.deletePost); //supprimer une sauce
router.post('/:id/like', stuffCtrl.likePost); //Gestion des likes et dislikes
router.post('/:id/unlike', stuffCtrl.unlikePost); //Gestion des likes et dislikes
router.post('/:id/dislike', stuffCtrl.dislikePost); //Gestion des likes et dislikes
router.post('/:id/undislike', stuffCtrl.undislikePost); //Gestion des likes et dislikes
router.post('/:id/comments', stuffCtrl.commentPost); //comments
router.put('/:id/edit-comments', stuffCtrl.editCommentPost);
router.put('/:id/delete-comments', stuffCtrl.deleteCommentPost);



module.exports = router; //exportations de notre routeur