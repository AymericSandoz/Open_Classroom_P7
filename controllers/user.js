const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//Inscriptions des utilisateurs
exports.signup = (req, res, next) => {

   const signUpErrors = (errors) =>{
        const error = { pseudo: "", email: "" };

  if (errors.message.includes("pseudo"))
  error.pseudo = "Pseudo incorrect ou déjà utilisé";

  if (errors.message.includes("email")) 
  error.email = "Email invalide";

  return error;
}

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
    
            const user = new User({
                email: req.body.email,
                password: hash,
                pseudo:req.body.pseudo
            });
            user.save()
                .then(() =>res.status(200).json({ message: 'Utilisateur créé !' }))
                .catch(error =>
                    res.status(201).json(signUpErrors(error) ));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }, function(err, user) {

    if (err) { 
        return res.status(500).json({ err });
     }

    if (user) {
        bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(200).json({ error: 'Mot de passe ou identifiant incorrect !' });
                    } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id },
                            process.env.KEY_JWT, { expiresIn: '30d' }
                        ),
                        pseudo:user.pseudo
                    });}
                })
                .catch(error => res.status(500).json({ error }));
    } else {
        res.status(200).json({ error: 'Mot de passe ou identifiant incorrect !' });
        
    }
})
}

/*
//Connexion des utilisateurs
exports.login = (req, res, next) => {

 const errorMessage = (err) => {
 let errors = { email: '', password: ''}

    if (err.message.includes("email")) 
      errors.email = "Email inconnu";
    
    if (err.message.includes('password'))
      errors.password = "Le mot de passe ne correspond pas"
  
    return errors;
 }
    
    User.findOne({ email: req.body.email },{explicit: true})
        .then(user => {
            console.log('serpent');
            console.log(user);
            if (!user) {/////inutile finalement  question mentor
                console.log('guepard');
                console.log(res.data);
                
                return res.status(200).json({ error : 'Email inconnu !' }
                );
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id },
                            process.env.KEY_JWT, { expiresIn: '12h' }
                        ),
                        pseudo:user.pseudo
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(501).json({ error }));
};*/


//useless
exports.logout = (req, res, next) => {
    console.log("déconnexion");
    res.status(200).json('Deconnected !');
    window.location.href('http://localhost:3000/Connexion')
};
