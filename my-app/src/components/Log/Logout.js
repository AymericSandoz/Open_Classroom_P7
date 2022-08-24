import React from "react";

const Logout = () => {
    const clearToken = () => {
        localStorage.clear();
        window.location = '/';
    };



    return (
        <li onClick={clearToken}>
            Se deconnecter
        </li>
    );
};

export default Logout;