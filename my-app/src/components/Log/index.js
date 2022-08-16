import React from 'react';
import { useState } from "react";
import SignInForm from "./signInForm";
import SignUpForm from "./signUpForm";







const Log = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    };
    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>

                    <li
                        onClick={handleModals}
                        id="register"
                        className={signUpModal ? "active-btn" : null}
                    >
                        S'inscrire
                    </li>
                    <li
                        onClick={handleModals}
                        id="login"
                        className={signInModal ? "active-btn" : null}
                    >
                        Se connecter
                    </li>
                </ul>
                {signUpModal && <SignUpForm />}  {/*QUestion mentor : Pourquoi <signUpForm/> ne marche pas ?  */}
                {signInModal && <SignInForm />}


                {/*}
//QUestion mentor pourquoi ça ne marche pas ??? 
                if({signUpModal})
                {<li>signUpForm()</li>};
                if({signInModal})
                {<li>signUpForm()</li>};
*/}

            </div>
        </div>
    );
};

export default Log;