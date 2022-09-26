import React from "react";
import { FaUsersSlash } from "react-icons/fa";
const Logout = () => {
    const clearToken = () => {
        if (window.confirm("Voulez-vous vous déconnectez ?")) {
            localStorage.clear();
            window.location = "/Connexion";
        }
    };

    return (
        <li onClick={clearToken}>
            <FaUsersSlash />
        </li>
    );
};

export default Logout;
