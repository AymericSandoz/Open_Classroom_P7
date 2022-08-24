import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to='/Connexion' exact activeClassName="active-left-nav">
                        Connexion
                    </NavLink>
                    <br />
                    <NavLink to='/' exact activeClassName="active-left-nav">
                        Fil d'actualité
                    </NavLink>
                    <br />
                    <NavLink to='/Profil' exact activeClassName="active-left-nav">
                        Profil
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;