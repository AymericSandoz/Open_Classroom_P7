import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./signInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [pseudo, setPseudo] = useState("");
  const [pseudoError, setPseudoError] = useState('');

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
        pseudo
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setEmailError(res.data.errors.email);
          setPasswordError(res.data.errors.password);
          setPseudoError(res.data.errors.pseudo)
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
            {emailError}
          </div>
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="email"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="pseudo error">
            {pseudoError}
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
          <input type="submit" className="btn-inscription" value="Valider votre inscription" />
          <div className="password error">
            {passwordError}
          </div>
        </form>
      )}
    </>
  );
};

export default SignUpForm;