import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import Button from "../components/Button";
import AuthContext from "../context/AuthProvider";
import { useSelector } from "react-redux";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const [recruiter, setRecruiter] = useState("No");

  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState(false);
  // const { authUser, loading } = useContext(AuthContext);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);

  const navigate = useNavigate();
  // empty the error when inputs change
  useEffect(() => {
    setError("");
    setSuccessful(false);
  }, [passwordText, confirmPasswordText, emailText]);

  useEffect(() => {
    if (isAuthenticated) {
      // console.log("user", authUser);
      navigate("/");
    }
  }, [isAuthenticated]);

  // if (loading) return <p>Loading...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordText !== confirmPasswordText) {
      setError("Passwords do not match.");
      return;
    }
    createUserWithEmailAndPassword(auth, emailText, passwordText)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          // displayName: recruiter === "Yes" ? "recruiter" : "user",
          photoURL: recruiter === "Yes" ? "recruiter" : "user",
          displayName: name,
        });
        const user = userCredential.user;
        console.log(user);
      })
      .then(() => {
        setSuccessful(true);
        window.location.reload();
        navigate("/");
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
    <main className="sign-up-main d-flex justify-content-center flex-column align-items-center">
      <h1 className="sign-up-heading">Sign Up</h1>
      <form
        className="sign-up-form d-flex w-25 p-2 justify-content-center flex-column align-items-center"
        onSubmit={handleSubmit}
      >
        {successful ? (
          <p className="success-div">Registration successful!</p>
        ) : (
          <p className="error-div">{error}</p>
        )}
        <input
          type="email"
          name="email"
          className="email-input form-control"
          placeholder="Email"
          onChange={(e) => setEmailText(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          name="name"
          className="name-input form-control"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        <div className="password-input-div d-flex justify-content-center  align-items-center w-100">
          <input
            type={!passwordVisible ? "password" : "text"}
            name="password"
            className="password-input form-control mx-2"
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
        <br />

        <div className="confirm-password-input-div d-flex justify-content-center  align-items-center w-100">
          <input
            type={!confirmPasswordVisible ? "password" : "text"}
            name="confirm-password"
            className="confirm-password-input form-control mx-2"
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
        <br />

        <div id="wrapper" className="w-100">
          <label htmlFor="yes_no_radio">Are you a recruiter?</label>
          <div className="form-check">
            <label className="form-check-label" htmlFor="yes">
              Yes
            </label>
            <input
              type="radio"
              name="yes"
              value="Yes"
              className="form-check-input"
              checked={recruiter === "Yes"}
              onChange={(e) => setRecruiter(e.currentTarget.value)}
            />
          </div>
          <div className="form-check">
            <label className="form-check-label" htmlFor="no">
              No
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="no"
              value="No"
              checked={recruiter === "No"}
              onChange={(e) => setRecruiter(e.currentTarget.value)}
            />
          </div>
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
      <br />
      <br />
      {/* <div className="login-div"> */}
      <p className="login-text">
        Already have an account? Login{" "}
        <Link className="login-link" to="/login">
          here
        </Link>
      </p>
      {/* </div> */}
    </main>
  );
};

export default SignUp;
