import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { UidContext } from "../AppContext";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaImage } from 'react-icons/fa';
const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState();
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);


    const handlePost = async () => {
        if (message || postPicture || video) {
            const data = new FormData();
            data.append('description', message);
            if (file) data.append("imageUrl", file);
            data.append('video', video);
            data.append('email', userData.email);

            const addPost = async (data) => {
  console.log('data description :'+data.description +'message' +message );
                await axios({
                    method: "post",
                    url: 'http://localhost:5000/api/post',
                    data: { data },
                    headers: {"Content-Type": "multipart/form-data", "authorization": `Bearer ${localStorage.getItem('token')}` }

                })
                    .then((res) => {

                        console.log(res.data);;

                    })
                    .catch((err) => console.log(err));
            };
            addPost(data);

            cancelPost();
        } else {
            alert("Veuillez entrer un message")
        }
    };



    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo('');
    };

    const cancelPost = () => {
        setMessage("");
        setPostPicture("");
        setVideo("");
        setFile("");
    };


    useEffect(() => {
        if (uid !== undefined) setIsLoading(false);

        const handleVideo = () => {
            let findLink = message.split(" ");
            for (let i = 0; i < findLink.length; i++) {
                if (
                    findLink[i].includes("https://www.yout") ||
                    findLink[i].includes("https://yout")
                ) {
                    let embed = findLink[i].replace("watch?v=", "embed/");
                    setVideo(embed.split("&")[0]);
                    findLink.splice(i, 1);
                    setMessage(findLink.join(" "));
                    setPostPicture('');
                }
            }
        };
        handleVideo();
    }, [userData, message, video]);

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (<>
                <div className="post-form">
                    <textarea
                        name="message"
                        id="message"
                        placeholder="Quoi de neuf ?"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    /></div>;
                {video && (
                    <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                    ></iframe>)}
                <span>{Date.now()}</span>
                {(video === "") && (
                    <>
                        <FaImage />
                        <input
                            type="file"
                            id="file-upload"
                            name="file"
                            accept=".jpg, .jpeg, .png"


                            onChange={(e) => handlePicture(e)}
                        />
                    </>
                )}
                {(video !== "") && (
                    <>
                        <FaImage />
                        <input
                            type="file"
                            id="file-upload"
                            name="file"
                            accept=".jpg, .jpeg, .png"
                        />
                    </>)}
                <div className="btn">
                    {message || postPicture || video.length > 20 ? (
                        <button className="cancel" onClick={cancelPost}>
                            Annuler message
                        </button>
                    ) : null}
                    <button className="send" onClick={handlePost}>
                        Envoyer
                    </button>
                </div>
            </>



            )}

        </div>)
};
export default NewPostForm;