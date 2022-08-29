const express = require('express');
const router = express.Router(); //création d'un routeur express dans lequel on va enregistrer nos routes

//Importation controller
const userCtrl = require('../controllers/user');

//Routes
router.post('/register', userCtrl.signup); //Inscriptions
router.post('/login', userCtrl.login); //COnnexion
router.post('/logout', userCtrl.logout);

module.exports = router; //exportations de notre routeur