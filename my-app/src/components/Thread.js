
import React, { useEffect, useState } from "react";
import Card from "./Card";

import axios from "axios";

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [posts, setPosts] = useState([]);

    
    const getPosts = async () => {
        console.log('getPosts');
        setLoadPost(true);
        await axios
            .get('http://localhost:5000/api/post/')
            .then((res) => {

                setPosts(res.data);

                setLoadPost(false);
                console.log(res.data);
            })
            .catch((err) => console.log('requête axios de post actions ne fonctionne pas' + err));
    };
    

    useEffect(() => {
        if (loadPost) {
         
            getPosts();
        }
    },
        [loadPost, posts])


    return (
        <div>
            <div className="thread-container">
                <ul>
                    {posts.length > 0 &&
                        posts.map((post) => {
                            return <Card post={post} reloadPosts={getPosts} key={post._id} />;
                        })}
                </ul>
            </div>
        </div>
    );
};

export default Thread;