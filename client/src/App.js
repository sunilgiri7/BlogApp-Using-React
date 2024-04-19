import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Contact from "./pages/contact/Contact";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Profile from "./pages/profile/Profile";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <TopBar />
      <Routes>
        {/* If there's no user, render the Login component, otherwise render the Home component */}
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/profile" element={user ? <Profile /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/contact" element={user ? <Contact /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
