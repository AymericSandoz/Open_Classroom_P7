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
 


    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}api/user/register`,
      data: {
        email,
        password,
        pseudo
      },
    })
      .then((res) => {
        console.log(res.data.pseudo || res.data.email);
;        if (res.data.pseudo) {
          setPseudoError(res.data.pseudo);
          setEmailError(res.data.email);
        } else {
          if(passwordError.length < 6) {
            setPasswordError('Le mot de passe doit contenir au moins 6 caractères');
          }
          else  {
          setFormSubmit(true);
        }
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
          <br />
          <div className="password error">
            {passwordError}
          </div>
          <br />
          <input type="submit" className="btn-inscription" value="Valider votre inscription" />
          
        </form>
      )}
    </>
  );
};

export default SignUpForm;