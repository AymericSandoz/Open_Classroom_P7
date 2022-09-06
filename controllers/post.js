const Post = require('../models/post');
const User = require('../models/user')
const fs = require('fs');


//créer un post 
exports.createPost = (req, res, next) => {
    console.log("creae pos :" + req.body);
    const postObject = req.body;
    console.log("creae pos &");
    delete postObject._id;

    if (req.file == undefined) {
        console.log(postObject);
        var post = new Post({
            ...postObject,
            userId: req.auth.userId,

        });

    }

    else {
        console.log("creae pos &&&");
        var post = new Post({
            ...postObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });

    }


    post.save()
        .then(() => { res.status(201).json({ message: 'post saved !' }) })
        .catch(error => { console.log(error); })
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
    console.log("req body str " + JSON.stringify(req.body));
    console.log("req body str " + JSON.parse(JSON.stringify(req.body)));
    console.log(req.body);


    const postObject = req.file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete postObject._userId;
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.auth.userId) {
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
    console.log(req.params.id);
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post.userId != req.auth.userId) {
                res.status(403).json({ message: ' unauthorized request' });
            } else {
                console.log('etape 2 de delete post atteinte');

                if (post.imageUrl === undefined) {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Object deleted !' }) })
                        .catch(error => res.status(401).json({ error }));
                }

                else {
                    const filename = post.imageUrl.split('/images/')[1];
                    console.log('etape 3 de delete post atteinte');
                    fs.unlink(`images/${filename}`, () => {
                        console.log('etape 4 de delete post atteinte');
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

/*exports.likePost = async(req, res) => {
    console.log('gg ligne 92');
    try {
        await Post.findByIdAndUpdate(
            req.params.id, {
                $addToSet: { usersLiked: req.body._id },
                //$addToSet: { likes: req.param.id },
            }, { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
};*/

exports.likePost = (req, res) => {
    console.log('Like fonction lancée');
    console.log('req.params.id' + req.params.id)

    Post.findByIdAndUpdate(req.params.id, {
        $addToSet: { usersLiked: req.auth.userId },
    }, { new: true },
        function (err, docs) {
            if (err) {
                console.log('error lors du like' + err);
                res.status(400).json(err);
            } else {
                console.log("req.auth._id", req.auth.userId);

                console.log("Updated likes : ", docs);
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
                console.log("req.auth._id", req.auth.userId);
                console.log("req.param.id", req.params.id);
                console.log("Updated likes : ", docs);
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
                console.log("req.body._id", req.auth.userId);
                console.log("req.param.id", req.params.id);
                console.log("Updated dislikes : ", docs);
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
                console.log("req.body._id", req.auth.userId);
                console.log("req.param.id", req.params.id);
                console.log("Updated dislikes : ", docs);
                res.send(docs);
            }
        });
};

exports.commentPost = (req, res) => {
    console.log('on entre dans comment post');
    console.log('on entre dans comment post');
    Post.findByIdAndUpdate(
        req.params.id, {
        $push: {
            comments: {
                commenterId: req.auth.userId,
                commenterEmail: req.body.commenterEmail,
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
};


exports.editCommentPost = (req, res) => {

    return Post.findById(req.params.id, (err, docs) => {
        const theComment = docs.comments.find((comment) =>
            comment._id.equals(req.body.commentId)
        );
        console.log("req.params.id : " + req.params.id);
        console.log("req.body.commentId: " + req.body.commentId);
        console.log("theComment: " + theComment);
        if (!theComment) return res.status(404).send("Comment not found");
        if (theComment.commenterId != req.auth.userId) return res.status(401).send("unauthorized request");
        theComment.text = req.body.text;
        console.log(theComment.text);
        console.log('docs:' + docs);


        return docs.save()
            .then(() => { res.status(201).json({ message: 'post saved !' }) })
            .catch(error => { res.status(400).send(err); })
    });
};

exports.deleteCommentPost = (req, res) => {
    console.log('req.params.id' + req.params.id);
    console.log('req.body.commentId:' + req.body.commentId);

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
    );
};