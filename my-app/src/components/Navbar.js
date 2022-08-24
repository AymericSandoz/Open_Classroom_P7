import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
    const uid = useContext(UidContext);//Problème : Uid est vide ! 
    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <h3>Groupomania</h3>
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>

                        <li className="welcome">
                            <NavLink exact to="/">
                                <h5>Bienvenue 'aymeric'</h5>
                            </NavLink>
                        </li>
                        <li>
                            <Logout />
                        </li>
                    </ul>
                ) : (

                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to="/Connexion">
                                'se connecter'
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;