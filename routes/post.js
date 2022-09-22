const express = require('express');
const router = express.Router(); //création d'un routeur express dans lequel on va enregistrer nos routes

//Importations des middleware
const auth = require('../middleware/auth'); //authentifications
const multer = require('../middleware/multer-config'); //gestions des images

//Importation controllers
const stuffCtrl = require('../controllers/post');

//Routes

router.get('/', stuffCtrl.getAllPosts); //Récupération de tous les posts
router.post('/', auth, multer, stuffCtrl.createPost); //Création de post
router.get('/:id', auth, stuffCtrl.getOnePost); //Récupération d'une post
router.put('/:id', auth, multer, stuffCtrl.modifyPost); //modifiation d'un post
router.delete('/:id', auth, stuffCtrl.deletePost); //supprimer un post
router.post('/:id/like', auth, stuffCtrl.likePost); //Gestion des likes et dislikes
router.post('/:id/unlike', auth, stuffCtrl.unlikePost); //Gestion des likes et dislikes
//router.post('/:id/dislike', auth, stuffCtrl.dislikePost); //Gestion des likes et dislikes
//router.post('/:id/undislike', auth, stuffCtrl.undislikePost); //Gestion des likes et dislikes
router.post('/:id/comments', auth, stuffCtrl.commentPost); //ajout commentaire
router.put('/:id/edit-comments', auth, stuffCtrl.editCommentPost);//modification commentaire
router.delete('/:id/delete-comments', auth, stuffCtrl.deleteCommentPost);//suppression commentaire



module.exports = router; //exportations de notre routeur