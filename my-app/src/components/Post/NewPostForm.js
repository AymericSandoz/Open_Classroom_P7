import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { UidContext } from "../AppContext";
import { FaImage } from 'react-icons/fa';
const NewPostForm = ({getPosts}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState();
    const uid = useContext(UidContext);


    const handlePost = async () => {
        if (message || postPicture || video) {
            const data = new FormData();
            data.append('description', message);
            if (file) data.append("image", file);
            data.append('video', video);
            

            console.log('file'+file);
  console.log('data description :'+data.description +'message' +message );
  console.log(data.image);
                 axios({
                    method: "post",
                    url: `${process.env.REACT_APP_SERVER_URL}api/post`,
                    data: data,
                    headers: {"Content-Type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem('token')}` }

                })
                    .then((res) => {
                        getPosts();
                        console.log(res.data);;

                    })
                    .catch((err) => console.log(err));
            
           

            cancelPost();
        } else {
            alert("Veuillez entrer un message")
        }
    };



    const handlePicture = (e) => {
        console.log('gogogo handle picture:'+e.target.files);
        setPostPicture(URL.createObjectURL(e.target.files[0]));//Visualiser l'image
        setFile(e.target.files[0]);
        setVideo('');
    };
const deleteImage = () => {
    
    setPostPicture("");
    setFile("");
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
                    setFile("");
                }
            }
        };
        handleVideo();
    }, [ message, video]);

    return (
        <div className="new-post-container">
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
                    /></div>
                    <img src={postPicture} alt="" />
                {video && (
                    <iframe
                        src={video}
                        frameBorder="0"
                        //allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                    ></iframe>)}
                    
                
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
                 
                 
                    
                    {message || postPicture || video.length > 20 ? (
                        <div className="footer-form">
                        <div className="btn-form">
                        <button className="cancel" onClick={cancelPost}>
                            Annuler message
                        </button>
                        {video && (
                  <button onClick={() => setVideo("")}>Supprimer video</button>
                )}
                {file && (
                  <button onClick={() => deleteImage()}>Supprimer image</button>
                )}
                    <button className="send" onClick={handlePost}>
                        Envoyer
                    </button>
                    </div>
                </div>
                    ) : null}
                
            </>



            )}

        </div>)
};
export default NewPostForm;