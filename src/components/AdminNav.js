import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './AdminNav.css'
import vote from '../images/vote.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminNav() {
  const location = useLocation();
  var id = location.pathname.split("/").pop();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    id=null;
    toast.success('Logged Out Successfully', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      setTimeout(()=>{
    window.location.href=window.location.origin;
  },1500)
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar" >
      <div className="nav">
        {window.innerWidth <= 768 && (
          <div className="menu-button" onClick={handleToggleMenu}>
            ☰
          </div>
        )}
        {window.innerWidth <= 768 && (
          <div className={`menu-items ${menuOpen ? "show" : ""}`}>
            <Link to={"/Admin/Home/" + id} className={`nav-link text-dark  `}>
            <img src={vote} className="CampusElect" alt="" /> CampusElect

            </Link>
            <Link to={"/Admin/Home/" + id} className={`nav-link text-dark  `}>
              Home
            </Link>
            <Link to={"/Admin/VoterList/" + id} className={`nav-link text-dark  ${location.pathname==="/Admin/Home/" + id ? "locActive" : ""}`}>
              Voters list
            </Link>
            <Link to={"/Admin/PartyList/" + id} className={`nav-link text-dark  ${location.pathname==="/Admin/Home/" + id ? "locActive" : ""}`}>
              Election List
            </Link>
            <Link to={"/Admin/IsVotedList/" + id} className={`nav-link text-dark  ${location.pathname==="/Admin/Home/" + id ? "locActive" : ""}`}>
              Voted List
            </Link>
            <Link to={"/Admin/Results/" + id} className={`nav-link text-dark  ${location.pathname==="/Admin/Home/" + id ? "locActive" : ""}`}>
              Results
            </Link>
            {id === "66557101be0f629991186bd0f" && (
              <Link to={"/Admin/AdminsList/" + id} className={`nav-link text-dark  ${location.pathname==="/Admin/Home/" + id ? "locActive" : ""}`}>
                Manage Admins
              </Link>
            )} 
            <Link to={"/Admin/Profile/" + id} className={`nav-link text-dark  ${location.pathname==="/Admin/Home/" + id ? "locActive" : ""}`}>
              Profile
            </Link>
          </div>
        )}
        {window.innerWidth > 768 && (
          <div className="desktop-items">
            <Link to={"/Admin/Home/" + id} className={`nav-link adminCampusElect   ${location.pathname===`{"/Admin/Home/" + id}` ? "locActive" : ""}`}>
      <img src={vote} className="CampusElect " alt="" /> CampusElect
             
            </Link>
            <Link to={"/Admin/Home/" + id} className={`nav-link text-dark   ${location.pathname==="/Admin/Home/" + id ? "locActive" : ""}`}>
              Home
            </Link>
            <Link to={"/Admin/VoterList/" + id} className={`nav-link text-dark  ${location.pathname==="/Admin/VoterList/" + id ? "locActive" : ""}`}>
              Voters list
            </Link>
            <Link to={"/Admin/PartyList/" + id} className={`nav-link text-dark  ${location.pathname==="/Admin/PartyList/" + id ? "locActive" : ""}`}>
              Election List
            </Link>
            <Link to={"/Admin/IsVotedList/" + id} className={`nav-link text-dark  ${location.pathname==="/Admin/IsVotedList/" + id ? "locActive" : ""}`}>
              Voted List
            </Link>
            <Link to={"/Admin/Results/" + id} className={`nav-link text-dark  ${location.pathname==="/Admin/Results/" + id ? "locActive" : ""}`}>
              Results
            </Link>
            {id === "6557101be0f629991186bd0f" && (
              <Link to={"/Admin/AdminsList/" + id} className={`nav-link text-dark  ${location.pathname==="/Admin/AdminsList/" + id ? "locActive" : ""}`}>
                Manage Admins
              </Link>
            )}
            <Link to={"/Admin/Profile/" + id} className={`nav-link text-dark  ${location.pathname==="/Admin/Profile/" + id ? "locActive" : ""}`}>
              Profile
            </Link>
          </div>
        )}
      </div>
      <div className="nav">
        <button
          onClick={handleLogout}
          className="btn btn-warning"
          style={{color: "white" }}
        >
          Log Out &nbsp;<i class="fa-solid fa-arrow-right-from-bracket"></i>
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
    </nav>
  );
}

export default AdminNav;



