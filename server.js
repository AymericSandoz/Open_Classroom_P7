const express = require('express'); //framework qui permet de coder plus rapidement. 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const cors = require('cors');
const app = express();
app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à notre API depuis n'importe quelle origine ( '*' ) 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.
    next();
});

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);




//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})