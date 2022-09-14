import React, { useContext, useEffect, useState } from "react";
import LikeButton from './Post/LikeButton';
import axios from 'axios';
import { UidContext } from "./AppContext";
import DeleteCard from './Post/DeleteCard';
import CardComments from './Post/CardComments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons'
import {FaEdit} from 'react-icons/fa';
import { dateParser } from './Utils';


const Card = ({ post,reloadPosts }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const uid = useContext(UidContext);
    const [currentpost, setcurrentpost] = useState(post);
    console.log(currentpost.imageUrl);
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

                    
                        <div className="card-header">
                            <div className="email">
                                <h3>{currentpost.pseudo}
                                </h3>

                            </div>
                            <span>{dateParser(currentpost.createdAt)}</span>
                        </div>
                    
                    <div className="post-container">
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
                    {currentpost.imageUrl && <img className="post-image" src={currentpost.imageUrl} alt="posted by user" />}
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
                    </div>
                    <div className="card-footer">
                    <div className="post-edit-like-delete">
                    <div className="like-icon">
                    <LikeButton post={currentpost} reloadPosts={reloadPosts}/>
                    </div>
                    {uid === currentpost.userId && (
                        <>

                            
                                <div className="edit-icon" onClick={() => setIsUpdated(!isUpdated)}>
                                   <FaEdit/>
                                   
                                </div>

                                <div className="delete-icon">
                            <DeleteCard id={currentpost._id} reloadPosts={reloadPosts} />
                            </div>
                            
                       
                            
                        </>
                        
                    )}
                    <div className="comment-icon">
                            <FontAwesomeIcon icon={faComment} onClick={() => setShowComments(!showComments)} />
                           
                            <span>{currentpost.comments.length}</span>
                            </div>
                    </div>
                    
                    
                    {showComments && <CardComments post={currentpost} reloadPosts={reloadPosts}/>}
                    </div>
                </>
            )
            }</li>
    );
};


export default Card;