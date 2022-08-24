
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { isEmpty } from "./Utils";

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.postReducer);/////pourquoi ça ne marche pas ? 
    console.log(posts[0]);
    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    },
        [loadPost, dispatch])


    return (
        <div className="thread-container">
            <ul>
                {posts[0].isEmpty() !== 0 &&//Pourquoi IF(){} ne marche pas ? 
                    posts.map((post) => {
                        return <li> {post._id} </li>;
                    })}
            </ul>
        </div>
    );
};

export default Thread;