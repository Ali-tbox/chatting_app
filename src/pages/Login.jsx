import React from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/main");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chatting App</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input placeholder="email" type="email" />
          <input placeholder="Enter password" type="password" />
          <button type="submit">Submit</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>
          Do you want to create an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
