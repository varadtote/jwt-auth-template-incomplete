import "./App.css";
import Header from "./Components/Header";
import Login from "./Components/Login";
import HomeScreen from "./Screens/HomeScreen";
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
