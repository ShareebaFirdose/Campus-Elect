import React, { useEffect } from 'react';
import vote from '../images/vote.jpg';
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <div>
      <nav className="navbar navsLogin navbar-expand-lg bg-body-tertiary" style={{ position: "fixed", width: "100%", top: 0, zIndex: 1000 }}>
        <div className="container-fluid">
          <Link className="navbar-brand navVote" to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={vote} className="CampusElect" alt="" style={{ width: '40px', marginRight: '8px' }} /> CampusElect
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/contact' className={`nav-link ${location.pathname === '/contact' ? "locActive" : ""}`}>Contact</Link>
              </li>
              <li className="nav-item">
                <Link to='/faq' className={`nav-link ${location.pathname === '/faq' ? "locActive" : ""}`}>FAQ</Link>
              </li>
              <li className="nav-item">
                <Link to='/promotion' className={`nav-link ${location.pathname === '/promotion' ? "locActive" : ""}`}>Promotion</Link>
              </li>
              <li className="nav-item">
                <Link to='/resources' className={`nav-link ${location.pathname === '/resources' ? "locActive" : ""}`}>Resources</Link>
              </li>
            </ul>
            <form className="d-flex navs" role="search">
              <Link to='/' className={`nav-link ${location.pathname === '/' ? "locActive" : ""}`}>Home</Link>
              <hr className="hr" />
              <Link to='/login'>
                <button className="btn btn-outline-warning" type="submit">Login <i className="fa-solid fa-user"></i></button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
      {/* Add a spacer div below the navbar to prevent overlap with the main content */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}

export default Navbar;
