import React from "react";
import axios from 'axios';

import { FaTrash } from "react-icons/fa";

const DeleteCard = ({ id, reloadPosts }) => {

    const OnClickDelete =() => {
console.log("onclickdelete");
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
            deletePost(id);
            
        }
    }
    const deletePost = async () => {
        console.log(id);
        await axios({
            method: "delete",
            url: `http://localhost:5000/api/post/${id}`,
            headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }
        })
            .then((res) => {
                console.log('object deleted');
                reloadPosts();
            })
            .catch((err) => console.log(err));
    };

   
    return (
        <div
            onClick={OnClickDelete}
        >
             <FaTrash />
        </div>
    );
};

export default DeleteCard;