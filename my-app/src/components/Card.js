import React, {
    useContext,
    useEffect,
    useState,
    useRef,
    useLayoutEffect
} from "react";
import LikeButton from "./Post/LikeButton";
import axios from "axios";
import { UidContext } from "./AppContext";
import DeleteCard from "./Post/DeleteCard";
import CardComments from "./Post/CardComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FaEdit } from "react-icons/fa";
import { getPostDate } from "./Utils";
import { isAdmin } from "./Utils";

import { FaImage } from "react-icons/fa";

const Card = ({ post, reloadPosts }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(post.description);
    const [showComments, setShowComments] = useState(false);
    const [postPicture, setPostPicture] = useState(post.imageUrl);
    const [file, setFile] = useState();
    const fileInput = useRef(null);
    const [imgHasBeenDeleted, setImgHasBeenDeleted] = useState(false);
    const [video, setVideo] = useState(post.video);
    const uid = useContext(UidContext);

    //const textareaRef = useRef(null);
    //const MIN_TEXTAREA_HEIGHT = 32;

    const updatePost = async (postId) => {
        const data = new FormData();

        ////Permet d'envoyer l'image selon que l'utilisateur ai ou nom supprimer l'image.
        data.append("description", textUpdate);
        if (file) {
            data.append("image", file);
        } else {
            console.log(!imgHasBeenDeleted);
            if (!imgHasBeenDeleted) {
                data.append("imageUrl", post.imageUrl);
            } else {
                data.append("imageUrl", "");
            }
        }

        data.append("video", video);
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_SERVER_URL}api/post/${postId}`,
            data: data,
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                reloadPosts();
            })
            .catch((err) => console.log(err));
    };
    const updateItem = () => {
        updatePost(post._id);

        setIsUpdated(false);
    };

    const updatePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0])); //Visualiser l'image
        setFile(e.target.files[0]);
        setImgHasBeenDeleted(false);
    };
    const deleteImage = () => {
        setPostPicture("");
        console.log(file);
        setFile("");
        console.log(file);
        setImgHasBeenDeleted(true);
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
                        console.log(
                            'embed.split("&")[0];;',
                            embed.split("&")[0]
                        );
                        setPostPicture("");
                        setFile("");
                        setImgHasBeenDeleted(true);
                    }
                }
            };
            handleVideo();
        }
        setIsLoading(false);
    }, [post, video, textUpdate]);

    /*useLayoutEffect(() => {
    console.log(textareaRef);
        // Reset height - important to shrink on delete
        textareaRef.current.style.height = "inherit";
        // Set height
        textareaRef.current.style.height = `${Math.max(
          textareaRef.current.scrollHeight,
          MIN_TEXTAREA_HEIGHT
        )}px`;
      }, [textUpdate]);*/

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? ( //Tant que les post chargent charge, on affiche un spinner.
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-header">
                        <div className="email">
                            <h3>{post.pseudo}</h3>
                        </div>
                        <span>{getPostDate(post.createdAt)}</span>
                    </div>

                    <div className="post-container">
                        {postPicture && (
                            <img
                                className="post-image"
                                src={postPicture}
                                alt="posted by user"
                            />
                        )}
                        {video && (
                            <iframe
                                width="500"
                                height="300"
                                src={video}
                                frameBorder="0"
                                //allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post._id}
                            ></iframe>
                        )}
                        {isUpdated === false && <p>{post.description}</p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea
                                    defaultValue={post.description}
                                    //style={{
                                    // minHeight: MIN_TEXTAREA_HEIGHT,
                                    // resize: "none"
                                    //}}

                                    onChange={(e) =>
                                        setTextUpdate(e.target.value)
                                    }
                                    //ref={textareaRef}
                                />
                            </div>
                        )}
                        <div className="button-container">
                            {isUpdated && postPicture && (
                                <div className="update-image-btn">
                                    <button
                                        onClick={() =>
                                            fileInput.current.click()
                                        }
                                    >
                                        <FaImage /> Modifier image{" "}
                                    </button>

                                    <input
                                        type="file"
                                        id="file-upload"
                                        name="file"
                                        accept=".jpg, .jpeg, .png"
                                        ref={fileInput}
                                        style={{ display: "none" }}
                                        onChange={(e) => updatePicture(e)}
                                    />

                                    <button onClick={() => deleteImage()}>
                                        Supprimer image
                                    </button>
                                </div>
                            )}
                            {isUpdated && !postPicture && !video && (
                                <>
                                    <button
                                        onClick={() =>
                                            fileInput.current.click()
                                        }
                                    >
                                        <FaImage /> Ajouter une image{" "}
                                    </button>

                                    <input
                                        type="file"
                                        id="file-upload"
                                        name="file"
                                        accept=".jpg, .jpeg, .png"
                                        ref={fileInput}
                                        style={{ display: "none" }}
                                        onChange={(e) => updatePicture(e)}
                                    />
                                </>
                            )}

                            {isUpdated && video.length > 20 && (
                                <button onClick={() => setVideo("")}>
                                    Supprimer video
                                </button>
                            )}
                            {isUpdated && (
                                <button className="btn" onClick={updateItem}>
                                    Valider modification
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="post-edit-like-delete">
                            <div className="like-icon">
                                <LikeButton post={post} />
                            </div>
                            {uid === post.userId || isAdmin() ? (
                                <>
                                    <div
                                        className="edit-icon"
                                        onClick={() => setIsUpdated(!isUpdated)}
                                    >
                                        <FaEdit />
                                    </div>

                                    <div className="delete-icon">
                                        <DeleteCard
                                            id={post._id}
                                            reloadPosts={reloadPosts}
                                        />
                                    </div>
                                </>
                            ) : null}
                            <div className="comment-icon">
                                <FontAwesomeIcon
                                    icon={faComment}
                                    onClick={() =>
                                        setShowComments(!showComments)
                                    }
                                />

                                <span>{post.comments.length}</span>
                            </div>
                        </div>

                        {showComments && (
                            <CardComments
                                post={post}
                                reloadPosts={reloadPosts}
                            />
                        )}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;
