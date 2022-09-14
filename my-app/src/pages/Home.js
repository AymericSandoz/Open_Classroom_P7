import React, { useContext } from "react";
import Thread from "../components/Thread";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";

import { NavLink } from "react-router-dom";

const Home = () => {
        const uid = useContext(UidContext);
        return (
                <div className="home">
                       
                        <div className="main">
                                <div className="home-header">
                                        {uid ? <NewPostForm /> : 
                                        <NavLink exact to="/Connexion">
                                                <div className="connexion-container">
                                        <p > Connectez vous pour ajouter un post ! </p>
                                        </div>
                                    </NavLink> }
                                </div>
                                <Thread />
                        </div>

                </div>
        );
}

export default Home;