import React, { useEffect, useState } from "react";
import LikeButton from './Post/LikeButton';


const dateParser = (num) => {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
};

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    console.log('post dans card :' + post);

    useEffect(() => {
        setIsLoading(false);
        console.log(post.lentgh);
        console.log('isLoading:' + isLoading);
    }, [post]);

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>

                    <div className="card-right">
                        <div className="card-header">
                            <div className="email">
                                <h3>{post.email}
                                </h3>

                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                    </div>
                    <div className="description">
                        {post.description}
                    </div>
                    {post.image && <img className="post-image" src={post.imageUrl} alt="posted by user" />}
                    {post.video && (
                        <iframe
                            width="500"
                            height="300"
                            src={post.video}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={post._id}
                        ></iframe>
                    )}
                    <span>{post.comments.length}</span>
                    <LikeButton post={post} />

                </>
            )
            }</li>
    );
};


export default Card;