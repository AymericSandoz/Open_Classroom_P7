import React from "react";
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

    const registerActionDone = () => {
        setSignUpModal(false);
        setSignInModal(true);
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
                {signUpModal && (
                    <SignUpForm registerActionDone={registerActionDone} />
                )}
                {signInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;
