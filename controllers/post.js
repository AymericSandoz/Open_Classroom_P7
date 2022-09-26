const Post = require("../models/post");
const User = require("../models/user");
const fs = require("fs");

//créer un post
exports.createPost = (req, res, next) => {
    User.findOne({ _id: req.auth.userId })
        .then((user) => {
            const userEmail = user.email;
            const userPseudo = user.pseudo;

            if (req.file == undefined) {
                var post = new Post({
                    userId: req.auth.userId,
                    description: req.body.description,
                    email: userEmail,
                    video: req.body.video,
                    pseudo: userPseudo
                });
            } else {
                var post = new Post({
                    description: req.body.description,
                    userId: req.auth.userId,
                    email: userEmail,
                    pseudo: userPseudo,
                    imageUrl: `${req.protocol}://${req.get("host")}/images/${
                        req.file.filename
                    }`,
                    video: req.body.video
                });
            }

            post.save()
                .then(() => {
                    res.status(201).json({ message: "post saved !" });
                })
                .catch((error) => {
                    res.status(404).json({
                        error: error
                    });
                });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

//Récupérer les posts
exports.getAllPosts = (req, res, next) => {
    Post.find((err, docs) => {
        if (!err) res.send(docs);
        else res.send("Erreur :" + err);
    }).sort({ createdAt: -1 });
};

//Récupérer un post
/*exports.getOnePost = (req, res, next) => {
    Post.findOne({
        _id: req.params.id
    })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(404).json({
                error: error
            });
        });
};*/

//Modifier un post
exports.modifyPost = (req, res, next) => {
    console.log("req.body", req.body);
    const postObject = req.file
        ? {
              ...req.body,
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`
          }
        : { ...req.body, imageUrl: req.body.imageUrl };

    console.log("req.file", req.file);
    console.log(".postObject", postObject);
    const admin_user_id = `${process.env.REACT_APP_ADMIN_USER_ID}`;
    //////supprimer l'image
    if (req.file == undefined) {
        Post.findOne({ _id: req.params.id })
            .then((post) => {
                if (
                    (post.userId != req.auth.userId) &
                    (req.auth.userId != admin_user_id)
                ) {
                    res.status(403).json({ message: " unauthorized request" });
                } else {
                    console.log("etape1");
                    console.log(post.imageUrl);
                    console.log("post;", post);
                    console.log("etape1");
                    console.log("!post.imageUrl", !post.imageUrl);
                    console.log(
                        "!post.undefined ? ",
                        post.imageUrl == undefined
                    );
                    console.log("post.imageUrl == true", post.imageUrl == "");
                    if (post.imageUrl && post.imageUrl != "") {
                        console.log("etape3");
                        const filename = post.imageUrl.split("/images/")[1];
                        fs.unlink(`images/${filename}`, (err) => {
                            if (err) {
                                console.log(
                                    "failed to delete local image:" + err
                                );
                            } else {
                                console.log("successfully deleted local image");
                            }
                        });
                    }
                }
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    ////modifier le post
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (
                (post.userId != req.auth.userId) &
                (req.auth.userId != admin_user_id)
            ) {
                res.status(403).json({ message: " unauthorized request" });
            } else {
                Post.updateOne(
                    { _id: req.params.id },
                    { ...postObject, _id: req.params.id }
                )
                    .then(() => res.status(201).json("object modified !"))
                    .catch((error) => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

//Supprimer un post
exports.deletePost = (req, res, next) => {
    const admin_user_id = `${process.env.REACT_APP_ADMIN_USER_ID}`;
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (
                (post.userId != req.auth.userId) &
                (req.auth.userId != admin_user_id)
            ) {
                res.status(403).json({ message: " unauthorized request" });
            } else {
                console.log(post.imageUrl);
                if (post.imageUrl === undefined) {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => {
                            res.status(200).json({
                                message: "Object deleted !"
                            });
                        })
                        .catch((error) => res.status(401).json({ error }));
                } else {
                    const filename = post.imageUrl.split("/images/")[1];

                    fs.unlink(`images/${filename}`, () => {
                        Post.deleteOne({ _id: req.params.id })
                            .then(() => {
                                res.status(200).json({
                                    message: "Object deleted !"
                                });
                            })
                            .catch((error) => res.status(401).json({ error }));
                    });
                }
            }
        })

        .catch((error) => {
            res.status(500).json({ error });
        });
};

//Liker un post
exports.likePost = (req, res) => {
    Post.findByIdAndUpdate(
        req.params.id,
        {
            $addToSet: { usersLiked: req.auth.userId }
        },
        { new: true }, // `doc` is the document _after_ `update` was applied because of `new: true
        function (err, docs) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.send(docs);
            }
        }
    );
};

//Unliker un post
exports.unlikePost = (req, res) => {
    Post.findByIdAndUpdate(
        req.params.id,
        {
            $pull: { usersLiked: req.auth.userId }
        },
        { new: true },
        function (err, docs) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.send(docs);
            }
        }
    );
};

/*exports.dislikePost = (req, res) => {

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
};*/

//Commenter un post
exports.commentPost = (req, res) => {
    User.findOne({ _id: req.auth.userId })
        .then((user) => {
            const userEmail = user.email;
            const userPseudo = user.pseudo;

            Post.findByIdAndUpdate(
                req.params.id,
                {
                    $push: {
                        comments: {
                            commenterId: req.auth.userId,
                            commenterEmail: userEmail,
                            commenterPseudo: userPseudo,
                            text: req.body.text,
                            timestamp: new Date().getTime()
                        }
                    }
                },
                { new: true },
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

//Modifier un com
exports.editCommentPost = (req, res) => {
    return Post.findById(req.params.id, (err, docs) => {
        const theComment = docs.comments.find((comment) =>
            comment._id.equals(req.body.commentId)
        );
        const admin_user_id = `${process.env.REACT_APP_ADMIN_USER_ID}`;

        if (!theComment) return res.status(404).send("Comment not found");
        if (
            (theComment.commenterId != req.auth.userId) &
            (req.auth.userId != admin_user_id)
        )
            return res.status(401).send("unauthorized request");
        theComment.text = req.body.text;

        return docs
            .save()
            .then(() => {
                res.status(201).json({ message: "post saved !" });
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    });
};

/*exports.deleteCommentPost2 = (req, res) => {
 

    
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
};*/

//SUpprimer un com
exports.deleteCommentPost = (req, res) => {
    const admin_user_id = `${process.env.REACT_APP_ADMIN_USER_ID}`;
    Post.findById(req.params.id, (err, docs) => {
        const theComment = docs.comments.find((comment) =>
            comment._id.equals(req.body.commentId)
        );
        if (
            (theComment.commenterId != req.auth.userId) &
            (req.auth.userId != admin_user_id)
        ) {
            res.status(403).json({ message: " unauthorized request" });
        } else {
            return Post.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: {
                        comments: {
                            _id: req.body.commentId
                        }
                    }
                },
                { new: true },
                (err, docs) => {
                    if (!err) return res.send(docs);
                    else return res.status(400).send(err);
                }
            );
        }
    });
};
