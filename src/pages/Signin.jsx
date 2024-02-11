import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import Button from "../components/Button";

import { useSelector } from "react-redux";

const Signin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();


  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);

  // empty the error when inputs change

  useEffect(() => {
    setError("");
  }, [emailText, passwordText]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, emailText, passwordText)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <main className="login-main">
      <h1 className="login-heading">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="error-div">{error}</p>

        <input
          type="email"
          name="email"
          className="email-input"
          placeholder="Email"
          onChange={(e) => setEmailText(e.target.value)}
          required
        />
        <div className="password-input-div">
          <input
            type={!passwordVisible ? "password" : "text"}
            name="password"
            className="password-input"
            placeholder="Password"
            onChange={(e) => setPasswordText(e.target.value)}
            required
          />
          <FontAwesomeIcon
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="eye-icon"
            icon={passwordVisible ? faEyeSlash : faEye}
          />
        </div>

        <Button type="submit">Login</Button>
      </form>

      <div className="sign-up-div">
        <p className="sign-up-text">Don't have an account? Sign up below</p>
        <Link className="sign-up-link" to="/sign-up">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </main>
  );
};

export default Signin;
