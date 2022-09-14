import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EditDeleteComment = ({ comment, postId ,reloadPosts}) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const uid = useContext(UidContext);

    const editComment = async (postId, commentId, text) => {

        await axios({
            method: "put",
            url: `http://localhost:5000/api/post/${postId}/edit-comments`,
            data: { commentId, text },
            headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }
        })
            .then((res) => {
                console.log('edit comment done')
                reloadPosts();
            })
            .catch((err) => console.log(err));

    };

    const deleteComment = async (postId, commentId) => {

        await axios({
            method: "delete",
            url: `http://localhost:5000/api/post/${postId}/delete-comments`,
            data: { commentId },
            headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }
        })
            .then((res) => {
                console.log('com supprimé')
            })
            .catch((err) => console.log(err));

    };

    const handleEdit = (e) => {
        e.preventDefault();

        if (text) {

            editComment(postId, comment._id, text);
            setText("");
            setEdit(false);
        }
    };

    const handleDelete = () => deleteComment(postId, comment._id);

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuthor(true);
            }
        };
        checkAuthor();
    }, [uid, comment.commenterId]);

    return (
        <div className="edit-comment">
            {isAuthor && (<FaTrash onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                    handleDelete();
                }
            }} />)}
            {isAuthor && edit === false && (
                <FaEdit onClick={() => setEdit(!edit)} />

            )}
            
            {isAuthor && edit && (
                <form action="" onSubmit={handleEdit} className="edit-comment-form">
                    <FaEdit onClick={() => setEdit(!edit)} />
                    <br />
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.text}
                        className="form-area-edited-comment"
                    />
                    <br />
                    <div className="btn">



                        <input type="submit" className="send-edited-comment" value="Valider modification" />
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;