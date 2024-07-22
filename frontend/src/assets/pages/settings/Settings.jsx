import "./setting.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../../context/Context";
import axios from "axios";
import UploadWidget from "../../../components/uploadWidget/UploadWidget";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState([]);

  const { user, dispatch } = useContext(Context);

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updateUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    try {
      const res = await axios.put("/users/" + user._id, updateUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settingWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <div className="settingsP">
            <label htmlFor="">Profile Picture</label>
            <img
              src={
                (image && image[0]) || user.profilePic || "./img/noAvatar.png"
              }
              alt=""
            />
            <UploadWidget
              uwConfig={{
                multiple: false,
                cloudName: "dzmhjb7a9",
                uploadPreset: "blogApp",
                folder: "profilePic",
              }}
              setImage={setImage}
            />
          </div>
          <label htmlFor="">Username</label>
          <input
            type="text"
            value={username}
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
