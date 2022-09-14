import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';



const LikeButton = ({ post, reloadPosts }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    console.log('uid :' + uid);


    const likePost = async (postId) => {
        console.log('valeur de postId:' + postId);
        await axios({
            method: "post",
            url: `http://localhost:5000/api/post/${postId}/like`,

            headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }
        })
            .then((res) => {
                console.log('likePost !!');
                setLiked(true);//Ne MARCHE PAS
                console.log('liked :   !!' + liked);
                reloadPosts();
            })
            .catch((err) => console.log(err));
    };

    const unlikePost = async (postId) => {

        await axios({
            method: "post",
            url: `http://localhost:5000/api/post/${postId}/unlike`,


            headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }

        })
            .then((res) => {
                console.log('unlike post !!');
                setLiked(false);////////NE MARCHE PAS 
                console.log('liked :   !!' + liked);
                reloadPosts();
            })
            .catch((err) => console.log(err));
    };





    useEffect(() => {
        if (post.usersLiked.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.usersLiked, liked]);

    return (<div className="like-container">
        {uid === null && (
            <Popup
                trigger={<FaHeart />}
                position={["bottom center", "bottom right", "bottom left"]}
                closeOnDocumentClick
            >
                <div>Connectez-vous pour aimer un post !</div>
            </Popup>)}
        {uid && liked === false && (
            <div className = 'LikeButton'> 
            <FaRegHeart onClick={() => likePost(post._id)} />
{post.usersLiked.length}
</div>
        )}
        {uid && liked && (
            <div className = 'LikeButton'> 
            <FaHeart onClick={() => unlikePost(post._id)} />
{post.usersLiked.length}
</div>
        )}

        


    </div>
    );
};

export default LikeButton;