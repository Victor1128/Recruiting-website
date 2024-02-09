import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [confirmPasswordText, setConfirmPasswordText] = useState("");

  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState(false);

  // empty the error when inputs change
  useEffect(() => {
    setError("");
    setSuccessful(false);
  }, [passwordText, confirmPasswordText, emailText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordText !== confirmPasswordText) {
      setError("Passwords do not match.");
      return;
    }
    createUserWithEmailAndPassword(auth, emailText, passwordText)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode, errorMessage)
        console.log(error);
      });
  };

  return (
    <main className="sign-up-main">
      <h1 className="sign-up-heading">Sign Up</h1>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        {successful ? (
          <p className="success-div">Registration successful!</p>
        ) : (
          <p className="error-div">{error}</p>
        )}
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
        <div className="confirm-password-input-div">
          <input
            type={!confirmPasswordVisible ? "password" : "text"}
            name="confirm-password"
            className="confirm-password-input"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPasswordText(e.target.value)}
            required
          />
          <FontAwesomeIcon
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            className="eye-icon"
            icon={confirmPasswordVisible ? faEyeSlash : faEye}
          />
        </div>

        <input type="submit" className="submit-input" value="Sign Up" />
      </form>

      <div className="login-div">
        <p className="login-text">
          Already have an account? Login{" "}
          <Link className="login-link" to="/login">
            here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
