import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const [forceLike, setForceLike] = useState(false);

    const [counterLike, setCounterLike] = useState(post.usersLiked.length);

    const likePost = async (postId) => {
        await axios({
            method: "post",
            url: `http://localhost:5000/api/post/${postId}/like`,

            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                setForceLike(true);
                setLiked(true);
                setCounterLike(counterLike + 1);
            })
            .catch((err) => console.log(err));
    };

    const unlikePost = async (postId) => {
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}api/post/${postId}/unlike`,

            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                setForceLike(true);
                setLiked(false);
                setCounterLike(counterLike - 1);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (post.usersLiked.includes(uid) && !forceLike) setLiked(true);
    }, [uid, post.usersLiked, liked]);

    return (
        <div className="like-container">
            {liked}
            {uid === null && (
                <div>
                    <FaRegHeart />
                    {counterLike}
                </div>
            )}
            {uid && liked === false && (
                <div className="LikeButton">
                    <FaRegHeart onClick={() => likePost(post._id)} />
                    {counterLike}
                </div>
            )}
            {uid && liked && (
                <div className="LikeButton">
                    <FaHeart onClick={() => unlikePost(post._id)} />
                    {counterLike}
                </div>
            )}
        </div>
    );
};

export default LikeButton;
