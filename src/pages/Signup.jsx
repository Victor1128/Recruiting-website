import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import Button from "../components/Button";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const [recruiter, setRecruiter] = useState("No");

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
        updateProfile(userCredential.user, {
          displayName: recruiter === "Yes" ? "recruiter" : "user",
        });
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode, errorMessage)
        setError(error.message);
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
        <div id="wrapper">
          <label for="yes_no_radio">Are you a recruiter?</label>
          <p>
            <label for="yes">Yes</label>
            <input
              type="radio"
              name="yes"
              value="Yes"
              checked={recruiter === "Yes"}
              onChange={(e) => setRecruiter(e.currentTarget.value)}
            />
          </p>
          <p>
            <label for="no">No</label>
            <input
              type="radio"
              name="no"
              value="No"
              checked={recruiter === "No"}
              onChange={(e) => setRecruiter(e.currentTarget.value)}
            />
          </p>
        </div>
        <Button type="submit">Sign Up</Button>
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
