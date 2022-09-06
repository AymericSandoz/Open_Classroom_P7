
import React, { useEffect, useState } from "react";
import Card from "./Card";

import axios from "axios";

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [posts, setPosts] = useState([]);


    const updatepost = () => {
        console.log('mise à jour de ous les potss')
    }

    useEffect(() => {
        if (loadPost) {
            const getPosts = async () => {
                await axios
                    .get('http://localhost:5000/api/post/')
                    .then((res) => {

                        setPosts(res.data);

                        setLoadPost(false);
                    })
                    .catch((err) => console.log('requête axios de post actions ne fonctionne pas' + err));
            };
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
                            return <Card post={post} updatepost={updatepost} key={post._id} />;
                        })}
                </ul>
            </div>
        </div>
    );
};

export default Thread;