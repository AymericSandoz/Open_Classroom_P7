import React, { useContext, useEffect, useState } from "react";
import LikeButton from './Post/LikeButton';
import axios from 'axios';
import { UidContext } from "./AppContext";
import DeleteCard from './Post/DeleteCard';
import CardComments from './Post/CardComments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons'
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

const Card = ({ post,updatepost }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const uid = useContext(UidContext);
    const [currentpost, setcurrentpost] = useState(post);

    const updatePost = async (postId, description) => {

        await axios({
            method: "put",
            url: `http://localhost:5000/api/post/${postId}`,
            data: { description },
            headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }
        })
            .then((res) => {
                console.log(textUpdate);
                //setTextUpdate(textUpdate);///NE MARCHE PAS 
                setcurrentpost({ ...currentpost, description })
            })
            .catch((err) => console.log(err));

    };
    const updateItem = () => {

        if (textUpdate) {
            updatePost(post._id, textUpdate);
        }
        setIsUpdated(false);
    };

    useEffect(() => {

        setIsLoading(false);
    }, [currentpost]);

    return (
        <li className="card-container" key={currentpost._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>

                    <div className="card-right">
                        <div className="card-header">
                            <div className="email">
                                <h3>{currentpost.email}
                                </h3>

                            </div>
                            <span>{dateParser(currentpost.createdAt)}</span>
                        </div>
                    </div>
                    {isUpdated === false && <p>{currentpost.description}</p>}
                    {isUpdated && (
                        <div className="update-post">
                            <textarea
                                defaultValue={currentpost.description}
                                onChange={(e) => setTextUpdate(e.target.value)}
                            />
                            <div className="button-container">
                                <button className="btn" onClick={updateItem}>
                                    Valider modification
                                </button>
                            </div>
                        </div>
                    )}
                    {currentpost.image && <img className="post-image" src={currentpost.imageUrl} alt="posted by user" />}
                    {currentpost.video && (
                        <iframe
                            width="500"
                            height="300"
                            src={currentpost.video}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={currentpost._id}
                        ></iframe>
                    )}
                    <LikeButton post={currentpost} />
                    {uid === currentpost.userId && (
                        <>

                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <h4>Modifier post </h4>
                                </div>

                            </div>
                            <DeleteCard id={currentpost._id} updatepost={updatePost} />
                        </>
                    )}
                    <div className="card-comment">
                        <div className="comment-icon">
                            <FontAwesomeIcon icon={faComment} onClick={() => setShowComments(!showComments)} />
                            <span>{currentpost.comments.length}</span>
                        </div>
                    </div>
                    {showComments && <CardComments post={currentpost} />}
                </>
            )
            }</li>
    );
};


export default Card;