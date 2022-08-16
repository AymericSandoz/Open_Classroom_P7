
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

/*const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");

        axios({
            method: "post",
            url: 'http://localhost:5000/api/user/login',
            //withCredentials: true,  !!!marche pas 
            data: {
                email: email,
                password: password,
            },
        })
            .then((res) => {

                console.log(res.data.errors);
                if (res.data.errors) {
                    console.log(res.data.errors);
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    window.location = "/";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="email error"></div>
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
            <div className="password error"></div>
            <br />
            <input type="submit" value="Se connecter" />
        </form>
    )
};*/


const SignInForm = () => {
    return (
        <div>
            yoooo
        </ div>)
}
export default SignInForm;