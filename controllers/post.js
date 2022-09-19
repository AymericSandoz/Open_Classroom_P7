const Post = require('../models/post');
const User = require('../models/user')
const fs = require('fs');


//créer un post 
exports.createPost = (req, res, next) => {
  
  User.findOne({ _id: req.auth.userId, })
  .then((user) => {
    const userEmail = user.email;
    const userPseudo = user.pseudo;
    
    if (req.file == undefined) {
       
        var post = new Post({
            userId: req.auth.userId,
    description: req.body.description,
    email : userEmail,
    video: req.body.video,
    pseudo: userPseudo
        });
      }
    
      
    
        else {
            console.log('else de create post');
            var post = new Post({
                
        description: req.body.description,
                userId: req.auth.userId,
                email : userEmail,
                pseudo:userPseudo,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                video: req.body.video
                
            });
    
        }
    
    console.log(post);
        post.save()
            .then(() => { res.status(201).json({ message: 'post saved !' }) })
            .catch(error => { console.log(error); })
      
  })
  .catch((error) => {
      res.status(500).json({ error });
  });



};

exports.getAllPosts = (req, res, next) => {
    Post.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 });
};

//ne marche pas 
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        _id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};



exports.modifyPost = (req, res, next) => {
    


    const postObject = req.file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete postObject._userId;
    
    console.log(`req.auth.userId`==`${process.env.REACT_APP_ADMIN_USER_ID}`)///=false HYYYYYYYYYYYYYYYY ???????????????????????????????????,
    
    const admin_user_id=`${process.env.REACT_APP_ADMIN_USER_ID}`;
    
    
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            console.log('requin');
            console.log(req.auth.userId);
            console.log(admin_user_id)
    console.log((post.userId != req.auth.userId & req.auth.userId!=admin_user_id));
    console.log( req.auth.userId!=admin_user_id);
    console.log(post.userId != req.auth.userId)
            if (post.userId != req.auth.userId & req.auth.userId!=admin_user_id) {
                res.status(403).json({ message: ' unauthorized request' });
            } else {
                Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => res.status(201).json('object modified !'))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error });
        });
};


exports.deletePost = (req, res, next) => {
    const admin_user_id=`${process.env.REACT_APP_ADMIN_USER_ID}`;
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post.userId != req.auth.userId & req.auth.userId!=admin_user_id) {
                res.status(403).json({ message: ' unauthorized request' });
            } else {
           

                if (post.imageUrl === undefined) {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Object deleted !' }) })
                        .catch(error => res.status(401).json({ error }));
                }

                else {
                    const filename = post.imageUrl.split('/images/')[1];
               
                    fs.unlink(`images/${filename}`, () => {
                        Post.deleteOne({ _id: req.params.id })
                            .then(() => { res.status(200).json({ message: 'Object deleted !' }) })
                            .catch(error => res.status(401).json({ error }));

                    });
                }
            }
        })

        .catch(error => {
            res.status(500).json({ error });
        });
};



exports.likePost = (req, res) => {
    console.log('Like fonction lancée');
    console.log('req.params.id' + req.params.id)

    Post.findByIdAndUpdate(req.params.id, {
        $addToSet: { usersLiked: req.auth.userId },
    }, { new: true },
        function (err, docs) {
            if (err) {
     
                res.status(400).json(err);
            } else {
      
                res.send(docs);
            }
        });
};

exports.unlikePost = (req, res) => {
    console.log('Unlike fonction lancée');
    Post.findByIdAndUpdate(req.params.id, {
        $pull: { usersLiked: req.auth.userId },
    }, { new: true },
        function (err, docs) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
       
                res.send(docs);
            }
        });
};



exports.dislikePost = (req, res) => {

    Post.findByIdAndUpdate(req.params.id, {
        $addToSet: { usersDisliked: req.auth.userId },
    }, { new: true },
        function (err, docs) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
        
                res.send(docs);
            }
        });
};

exports.undislikePost = (req, res) => {

    Post.findByIdAndUpdate(req.params.id, {
        $pull: { usersDisliked: req.auth.userId },
    }, { new: true },
        function (err, docs) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
              
                res.send(docs);
            }
        });
};

exports.commentPost = (req, res) => {
    console.log('on entre dans comment post');
    User.findOne({ _id: req.auth.userId, })
    .then((user) => {
      const userEmail = user.email;
      const userPseudo = user.pseudo;
     
    Post.findByIdAndUpdate(
        req.params.id, {
        $push: {
            comments: {
                commenterId: req.auth.userId,
                commenterEmail: userEmail,
                commenterPseudo : userPseudo,
                text: req.body.text,
                timestamp: new Date().getTime(),
            },
        },
    }, { new: true },
        (err, docs) => {

            if (!err) return res.send(docs);
            else return res.status(400).send(err);
        }
    );
})
.catch((error) => {
    res.status(500).json({ error });
});
};


exports.editCommentPost = (req, res) => {
    
    return Post.findById(req.params.id, (err, docs) => {
        const theComment = docs.comments.find((comment) =>
            comment._id.equals(req.body.commentId)
        );
        const admin_user_id=`${process.env.REACT_APP_ADMIN_USER_ID}`;
       
        if (!theComment) return res.status(404).send("Comment not found");
        if (theComment.commenterId != req.auth.userId & req.auth.userId!=admin_user_id) return res.status(401).send("unauthorized request");
        theComment.text = req.body.text;
     


        return docs.save()
            .then(() => { res.status(201).json({ message: 'post saved !' }) })
            .catch(error => { res.status(400).send(error); })
    });
};

exports.deleteCommentPost2 = (req, res) => {
 

    
    if (post.comment.commenterId != req.auth.userId & req.auth.userId!=admin_user_id) {
        res.status(403).json({ message: ' unauthorized request' });
    } else {
    return Post.findByIdAndUpdate(
        req.params.id, {
            
        $pull: {
            comments: {
                _id: req.body.commentId,
            },
        },
    }, { new: true },
        (err, docs) => {
            if (!err) return res.send(docs);
            else return res.status(400).send(err);
        }
    );}
};

exports.deleteCommentPost = (req, res) => {
    const admin_user_id=`${process.env.REACT_APP_ADMIN_USER_ID}`;
    Post.findById(req.params.id, (err, docs) => {
        const theComment = docs.comments.find((comment) =>
            comment._id.equals(req.body.commentId)
        );
    if (theComment.commenterId != req.auth.userId & req.auth.userId!=admin_user_id) {
        res.status(403).json({ message: ' unauthorized request' });
    } else {
    return Post.findByIdAndUpdate(
        req.params.id, {
            
        $pull: {
            comments: {
                _id: req.body.commentId,
            },
        },
    }, { new: true },
        (err, docs) => {
            if (!err) return res.send(docs);
            else return res.status(400).send(err);
        }
    );}
})};
