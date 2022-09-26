import React, { useContext } from "react";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

import { NavLink } from "react-router-dom";
import Logo from "../images/icon-left-font-monochrome-black.png";

import { FaUserCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
    const uid = useContext(UidContext);
    const pseudo = localStorage.getItem("pseudo");
    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/" aria-label="Lien page d'acceuil">
                        <img src={Logo} alt="icone-groupomania" />
                    </NavLink>
                </div>

                {uid ? (
                    <ul className="user">
                        <li>
                            <h4> Bienvenu {pseudo} </h4>
                        </li>
                        <li>
                            <NavLink
                                exact
                                to="/"
                                aria-label="Lien page d'acceuil"
                            >
                                <FaHome />
                            </NavLink>
                        </li>

                        <li>
                            <Logout
                                aria-label="Lien déconnexion"
                                role="navigation"
                            />
                        </li>
                    </ul>
                ) : (
                    <NavLink exact to="/Connexion" aria-label="Lien connexion">
                        <FaUserCircle />
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
