const express = require('express'); //framework qui permet de coder plus rapidement. 
require('dotenv').config({ path: './config/.env' });
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const path = require('path'); //accéder au path de notre serveur :

const requireAuth = require('./middleware/requireAuth');
require('./config/db');
const app = express();
var bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à notre API depuis n'importe quelle origine ( '*' ) 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.
    next();
});

// Sets all of the defaults, but overrides `script-src` and disables the default `style-src`


//express rate limiter 
// The express-rate-limit is for
// limiting the incoming request.
const rateLimit = require("express-rate-limit");
  
// Creating a limiter by calling rateLimit function with options:
// max contains the maximum number of request and windowMs
// contains the time in millisecond so only max amount of
// request can be made in windowMS time.
const limiter = rateLimit({
    max: 5000,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP"
});
  
// Add the limiter function to the express middleware
// so that every request coming from user passes
// through this middleware.
app.use(limiter);

app.get('/api/action', function(req, res) {
    res.send(200, 'ok')
})

app.post('/jwtid', requireAuth, (req, res) => {
    console.log('requireauth marche');
});
//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))); //Cela indique à Express qu'il faut gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base, __dirname) à chaque fois qu'elle reçoit une requête vers la route /images. 

console.log(path.join(path.join(__dirname, 'images')));


//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})

