import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { apiUrl, getError } from "../../../utils";
import UploadWidget from "../../../components/uploadWidget/UploadWidget";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const profilePic = image[0];
    try {
      const res = await axios.post(`${apiUrl}/api/users/register`, {
        username,
        profilePic,
        email,
        password,
      });
      console.log(res);
      navigate("/login");
    } catch (err) {
      alert(getError(err));
      setError(true);
    }
  };
  return (
    <>
      <div className="register">
        <span className="registerTitle">Register</span>
        <img src={image && image[0]} alt="" className="profile" />
        <UploadWidget
          uwConfig={{
            multiple: false,
            cloudName: "dzmhjb7a9",
            uploadPreset: "blogApp",
            folder: "profilePic",
          }}
          setImage={setImage}
        />
        <form className="registerForm" onSubmit={handleSubmit}>
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter Your Username,..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter Your E-mail,..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="registerInput"
            placeholder="Enter Your Password,..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
        <button className="registerLoginButton">
          <Link className="link" to="/login">
            Login
          </Link>
        </button>
        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something went wrong!
          </span>
        )}
      </div>
    </>
  );
}
