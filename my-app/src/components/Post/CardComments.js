import React, { useState, useContext } from "react";
import axios from 'axios';
import { UidContext } from "../AppContext";
import EditDeleteComment from "./EditOrDeleteComments";
import { dateParser } from '../Utils'
const CardComments = ({ post }) => {
    const [text, setText] = useState("");
    const uid = useContext(UidContext);

    const handleComment = (e) => {
        e.preventDefault();

        if (text) {
            const addComment = async (postId, text, commenterEmail) => {

                await axios({
                    method: "post",
                    url: `http://localhost:5000/api/post/${postId}/comments`,
                    data: { text, commenterEmail },
                    headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }
                })
                    .then((res) => {
                        console.log('requête axios commentaire réussis');
                    })
                    .catch((err) => console.log(err));
            };
            addComment(post._id, text, `test/${uid}/@hotmail.fr"`)
        };

    }


    return (
        <>


            {post.comments.map((comment) => {
                return (
                    <>
                        <div className="email">
                            <h3>{comment.commenterEmail}</h3>
                        </div>
                        <span>{dateParser(comment.timestamp)}</span>
                        <p>{comment.text}</p>
                        <EditDeleteComment comment={comment} postId={post._id} />
                    </>
                )
            }
            )}
            {uid && (
                <form action="" onSubmit={handleComment} className="comment-form">
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder="Laisser un commentaire"
                    />
                    <br />
                    <input type="submit" value="Envoyer" />
                </form>
            )}


        </>
    )
};

export default CardComments;