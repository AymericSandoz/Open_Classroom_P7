import React, { useEffect, useState } from "react";
import axios from "axios";
import SignInForm from "./signInForm";

const SignUpForm = (props) => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [pseudo, setPseudo] = useState("");
    const [pseudoError, setPseudoError] = useState("");
    const passwordMinimunLengthSecurity = 5; //Tqille minimun MDP

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password.length > passwordMinimunLengthSecurity) {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_SERVER_URL}api/user/register`,
                data: {
                    email,
                    password,
                    pseudo
                }
            })
                .then((res) => {
                    if (res.data.pseudo == "" && res.data.email == "") {
                        props.registerActionDone();
                        setFormSubmit(true);
                    } else if (res.data.message == "Utilisateur créé !") {
                        props.registerActionDone();
                        setFormSubmit(true);
                    } else {
                        setPseudoError(res.data.pseudo);
                        setEmailError(res.data.email);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            setPasswordError(
                `Le mot de passe doit contenir plus de ${passwordMinimunLengthSecurity} caractères`
            );
        }
    };

    useEffect(() => {
        if (password.length > 0) {
            if (password.length > passwordMinimunLengthSecurity) {
                setPasswordError("");
            } else {
                setPasswordError(
                    `Le mot de passe doit contenir plus de ${passwordMinimunLengthSecurity} caractères`
                );
            }
        } else {
            setPasswordError(``);
        }
    }, [password]);

    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />
                </>
            ) : (
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className="email error">{emailError}</div>
                    <label htmlFor="pseudo">Pseudo</label>
                    <br />
                    <input
                        type="text"
                        name="pseudo"
                        id="email"
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                    />
                    <div className="pseudo error">{pseudoError}</div>
                    <br />
                    <label htmlFor="password">Mot de passe</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <br />
                    <div className="password error">{passwordError}</div>
                    <br />
                    <input
                        type="submit"
                        className="btn-inscription"
                        value="Valider votre inscription"
                    />
                    <input
                        type="submit"
                        className="btn-inscription-mobile"
                        value="Valider"
                    />
                </form>
            )}
        </>
    );
};

export default SignUpForm;
