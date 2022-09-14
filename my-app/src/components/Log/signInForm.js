
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const HandleLogin = (e) => {
        e.preventDefault();
        //const [emailError,setEmailError] = document.querySelector(".email.error");
        //const [passwordError,setPasswordError] = document.querySelector(".password.error");



        axios({
            method: "post",
            url: 'http://localhost:5000/api/user/login',
            //withCredentials: true,   !!!marche pas 
            data: {
                email: email,
                password: password,
            },
        })
            .then((res) => {/////marche pas, on va directement dans le catch. QUESTION MENTOR
                console.log('res data error : ' + res);

                if (res.data.errors) {
                    console.log(res.data.errors);

                    setEmailError(res.data.errors.email);
                    console.log(res.data.errors.email)
                    setPasswordError(res.data.errors.password);
                    console.log(res.data.errors.password)

                } else {
                    window.location = "/";
                    localStorage.setItem('token', res.data.token);


                }
            })
            .catch((err) => {
                console.log('requete axios singnINform ne marche pas' + err);
            });
    };


    return (
        <form action="" onSubmit={HandleLogin} id="sign-in-form">
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="email error">
                {emailError}
            </div>
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
            <div className="password error">
                {passwordError}
            </div>
            <br />
            <input type="submit" className="btn-connexion" value="Se connecter" />
        </form>
    )
};



export default SignInForm;