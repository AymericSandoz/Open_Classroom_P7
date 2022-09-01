import React from "react";
import axios from 'axios';


const DeleteCard = ({ id }) => {

    const deletePost = async (postId) => {
        console.log(postId);
        await axios({
            method: "delete",
            url: `http://localhost:5000/api/post/${postId}`,
            headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }
        })
            .then((res) => {
                console.log('object deleted');
            })
            .catch((err) => console.log(err));
    };


    return (
        <div
            onClick={() => {
                if (window.confirm("Voulez-vous supprimer cet article ?")) {
                    deletePost(id);
                }
            }}
        >
            <h3>Supprimer</h3>
        </div>
    );
};

export default DeleteCard;