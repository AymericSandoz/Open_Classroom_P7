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
import {isAdmin} from './Utils';

import { FaImage } from 'react-icons/fa';

const Card = ({ post,reloadPosts }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [postPicture,setPostPicture]=useState(post.imageUrl);
    const [file,setFile]=useState();
    const [video,setVideo]=useState(post.video);
    const uid = useContext(UidContext);
  
   

   


    const updatePost = async (postId, description) => {
        
            const data = new FormData();
            data.append('description', textUpdate);
            if (file) data.append("image", file);
           
        
        

        await axios({
            method: "put",
            url: `${process.env.REACT_APP_SERVER_URL}api/post/${postId}`,
            data:  data ,
            headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }
        })
            .then((res) => {
                
                reloadPosts();
            })
            .catch((err) => console.log(err));

    };
    const updateItem = () => {

        if (textUpdate) {
            updatePost(post._id, textUpdate);
        }
        setIsUpdated(false);
    };

    const updatePicture = (e) => {
        console.log('gogogo handle picture:'+e.target.files);
        setPostPicture(URL.createObjectURL(e.target.files[0]));//Visualiser l'image
        setFile(e.target.files[0]);
      
        console.log('seecheeath')
    };
const deleteImage = () => {
    
    setPostPicture("");
    setFile("");
};

    useEffect(() => {
        if (textUpdate) {
        const handleVideo = () => {
           
            let findLink = textUpdate.split(" ");
            for (let i = 0; i < findLink.length; i++) {
                if (
                    findLink[i].includes("https://www.yout") ||
                    findLink[i].includes("https://yout")
                ) {
                    let embed = findLink[i].replace("watch?v=", "embed/");
                    setVideo(embed.split("&")[0]);
                    findLink.splice(i, 1);
                    setTextUpdate(findLink.join(" "));
                    setPostPicture('');
                }
            }
        };
        handleVideo();}
        setIsLoading(false);
    }, [post,video,textUpdate]);

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>

                    
                        <div className="card-header">
                            <div className="email">
                                <h3>{post.pseudo}
                                </h3>

                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                    
                    <div className="post-container">
                    {isUpdated === false && <p>{post.description}</p>}
                    {isUpdated && (
                        <div className="update-post">
                            <textarea
                                defaultValue={post.description}
                                onChange={(e) => setTextUpdate(e.target.value)}
                            />
                            <div className="button-container">
                                <button className="btn" onClick={updateItem}>
                                    Valider modification
                                </button>
                            </div>
                        </div>
                    )}
                    {postPicture && <img className="post-image" src={postPicture} alt="posted by user" />
                    
                    }
                    {isUpdated && postPicture && (
                    <>
                    <button><FaImage /> Modifier image </button>
               
                        <input
                            type="file"
                            id="file-upload"
                            name="file"
                            accept=".jpg, .jpeg, .png"


                            onChange={(e) => updatePicture(e)}
                        />
                       
                  <button onClick={() => deleteImage()}>Supprimer image</button>
                
                    </>)} 
                     {isUpdated && !postPicture && !video &&  (
                        <><button><FaImage /> Ajouter une image </button>
               
               <input
                   type="file"
                   id="file-upload"
                   name="file"
                   accept=".jpg, .jpeg, .png"


                   onChange={(e) => updatePicture(e)}
               /></>)
                    }
                     


                    {video && (
                        <iframe
                            width="500"
                            height="300"
                            src={video}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={post._id}
                        ></iframe>

                    )}
                    {isUpdated && video.length > 20 && (
                        
                        <button onClick={() => setVideo("")}>Supprimer video</button>
                      )}
                    </div>
                    <div className="card-footer">
                    <div className="post-edit-like-delete">
                    <div className="like-icon">
                    <LikeButton post={post} />
                    </div>
                    {uid===post.userId  | isAdmin() ? (
                        <>

                            
                                <div className="edit-icon" onClick={() => setIsUpdated(!isUpdated)}>
                                   <FaEdit/>
                                   
                                </div>

                                <div className="delete-icon">
                            <DeleteCard id={post._id} reloadPosts={reloadPosts} />
                            </div>
                            
                       
                            
                        </>
                        
                    ):(null)}
                    <div className="comment-icon">
                            <FontAwesomeIcon icon={faComment} onClick={() => setShowComments(!showComments)} />
                           
                            <span>{post.comments.length}</span>
                            </div>
                    </div>
                    
                    
                    {showComments && <CardComments post={post} reloadPosts={reloadPosts}/>}
                    </div>
                </>
            )
            }</li>
    );
};


export default Card;