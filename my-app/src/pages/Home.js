
import Thread from "../components/Thread";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";
import React, { useEffect, useState,useContext } from "react";

import axios from "axios";

import { NavLink } from "react-router-dom";

const Home = () => {
        const uid = useContext(UidContext);
        const [loadPost, setLoadPost] = useState(true);
        const [posts, setPosts] = useState([]);
      
       
        
        const getPosts = async () => {
    console.log('load Get post');
    console.log(process.env.REACT_APP_SERVER_URL);
            setLoadPost(true);
            await axios
                .get(`${process.env.REACT_APP_SERVER_URL}api/post/`)
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
                <div className="home">
                       
                        <div className="main">
                                <div className="home-header">
                                        {uid ? <NewPostForm getPosts={getPosts} /> : 
                                        <NavLink exact to="/Connexion">
                                                <div className="connexion-container">
                                        <p > Connectez vous pour ajouter un post ! </p>
                                        </div>
                                    </NavLink> }
                                </div>
                                <Thread posts={posts} getPosts={getPosts}/>
                        </div>

                </div>
        );
}

export default Home;