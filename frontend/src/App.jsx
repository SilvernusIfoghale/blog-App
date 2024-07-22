import { useContext } from "react";
import Home from "./assets/pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";
import Login from "./assets/pages/login/Login";
import Register from "./assets/pages/register/Register";
import Write from "./assets/pages/write/Write";
import Single from "./assets/pages/single/Single";
import Settings from "./assets/pages/settings/Settings";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
