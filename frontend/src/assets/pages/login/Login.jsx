import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import "./login.css";
import { apiUrl } from "../../../utils";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, loading } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const { data } = await axios.post(`${apiUrl}/api/users/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(data);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <>
      <div className="login">
        <span className="loginTitle">Login</span>
        <form onSubmit={handleSubmit} className="loginForm">
          <label htmlFor="">Enter Your E-mail</label>
          <input
            type="email"
            className="loginInput"
            placeholder="Enter Your E-mail,.."
            ref={emailRef}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="loginInput"
            placeholder="Enter Your Password,.."
            ref={passwordRef}
          />
          <button className="loginButton" type="submit" disabled={loading}>
            Login
          </button>
        </form>
        <button className="loginRegisterButton">
          <Link className="link" to="/register">
            Register
          </Link>
        </button>
      </div>
    </>
  );
}
