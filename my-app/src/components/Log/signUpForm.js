import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./signInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    //const emailError = document.querySelector(".email.error");///à modif
    //const passwordError = document.querySelector(".password.error");



    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/register',
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setEmailError(res.data.errors.email);
          setPasswordError(res.data.errors.password);
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => console.log(err));
  };


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
          <div className="email error">
            {emailError};
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
          <input type="submit" value="Valider votre inscription" />
          <div className="password error">
            {passwordError};
          </div>
        </form>
      )}
    </>
  );
};

export default SignUpForm;