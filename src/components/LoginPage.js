import React, { useState } from "react";
import './loginstyle.css'; // Import the CSS file
import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";
import Foot from "./foot.js";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [loginType, setLoginType] = useState("user");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [phno, setPhNo] = useState("");

  const [text] = useTypewriter({
    words: ['Vote', 'See Results', 'See Nominated'],
    loop: {},
    typeSpeed: 80,
    deleteSpeed: 20,
  });

  const handleLogin = async () => {
    const databaseUrl = "http://localhost:5000/AdminsRoute";
    const votersUrl = "http://localhost:5000/VoterListRoute";

    try {
      if (loginType === "admin") {
        const response = await fetch(databaseUrl);
        if (!response.ok) throw new Error(`Request failed with status: ${response.status}`);
        
        const adminCredentials = await response.json();
        const foundAdmin = adminCredentials.find(
          (admin) => admin.username === userName && admin.password === password
        );

        if (foundAdmin) {
          toast.success('Logged in Successfully', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          setTimeout(() => {
            window.location.href = `${window.location.origin}/#/Admin/Home/${foundAdmin._id}`;
          }, 1500);
        } else {
          toast.error('Invalid Admin Credentials', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      } else if (loginType === "user") {
        const response = await fetch(votersUrl);
        if (!response.ok) throw new Error(`Request failed with status: ${response.status}`);
        
        const userCredentials = await response.json();
        const foundUser = userCredentials.find(
          (user) => user.Id === userId && user.PhoneNumber === phno
        );

        if (foundUser) {
          toast.success('Logged in Successfully', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          setTimeout(() => {
            window.location.href = `${window.location.origin}/#/User/Home/${foundUser._id}`;
          }, 1500);
        } else {
          toast.error('Invalid User Credentials', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while fetching data", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      // Clear input fields after login attempt
      setUserName("");
      setPassword("");
      setUserId("");
      setPhNo("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="app">
        <div className="getSign">Get <span className="special">Signed in</span> to</div>
        <div className="typewriter">
          <span style={{ position: "relative" }}>{text}</span>
          <Cursor />
        </div>
        <div className="login-form">
          <div className="title text-center">Sign In</div>
          <hr className="pb-3" />
          <div className="button-container">
            <button
              className={`col-6 btn ${loginType === "user" ? "active btn-dark" : ""}`}
              onClick={() => setLoginType("user")}
            >
              User Login
            </button>
            <button
              className={`col-6 btn ${loginType === "admin" ? "active btn-dark" : ""}`}
              onClick={() => setLoginType("admin")}
            >
              Admin Login
            </button>
          </div>
          <div className="input-container">
            {loginType === "user" ? (
              <>
                <div className="input-container">
                  <label>User ID</label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <div className="input-container">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={phno}
                    onChange={(e) => setPhNo(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="input-container">
                  <label>User Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="input-container">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <div className="button-container">
            <button className="btn btn-warning" style={{ color: "white" }} onClick={handleLogin}>
              Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </div>
      </div>
      <footer>
        <Foot />
      </footer>
    </>
  );
}

export default LoginPage;
