import React, { useState, useContext } from "react";
import axios from "axios";
import { UidContext } from "../AppContext";
import EditDeleteComment from "./EditOrDeleteComments";
import { getDate } from "../Utils";
const CardComments = ({ post, reloadPosts }) => {
    const [text, setText] = useState("");
    const uid = useContext(UidContext);

    const handleComment = (e) => {
        e.preventDefault();

        if (text) {
            const addComment = async (postId, text) => {
                await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_SERVER_URL}api/post/${postId}/comments`,
                    data: { text },
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                    .then((res) => {
                        reloadPosts();
                        setText("");
                    })
                    .catch((err) => console.log(err));
            };
            addComment(post._id, text);
        }
    };

    return (
        <div className="card-comments">
            {post.comments.map((comment) => {
                return (
                    <div className="card-comment" key={comment._id}>
                        <div className="comment-header">
                            <div className="pseudo">
                                <h3>{comment.commenterPseudo}</h3>
                            </div>
                            <div className="date">
                                {getDate(comment.timestamp)}
                            </div>
                        </div>
                        <div className="comment-content">
                            <p>{comment.text}</p>
                        </div>
                        <EditDeleteComment
                            comment={comment}
                            postId={post._id}
                            reloadPosts={reloadPosts}
                        />
                    </div>
                );
            })}
            {uid && (
                <form
                    action=""
                    onSubmit={handleComment}
                    className="comment-form"
                >
                    <textarea
                        name="text"
                        className="comment-area"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder="Laisser un commentaire"
                        maxLength="50"
                    />
                    <br />
                    <input
                        type="submit"
                        className="send-form"
                        value="Envoyer"
                    />
                </form>
            )}
        </div>
    );
};

export default CardComments;
