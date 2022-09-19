
import React from "react";
import Card from "./Card";



const Thread = ({posts,getPosts}) => {
   


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