import React from 'react';
import { Link } from "react-router-dom";
import './index.css'; // Ensure this CSS file includes the above styles
// Remove the Navbar import
import Foot from './foot'; // Make sure this matches your actual file name

function Index() {
  return (
    <>
      <div className='bg1 bg-pan-bl'> {/* Add the bg-pan-bl class here */}
        <div className="ctnt">
          <h1>Welcome! to <span className='special'></span> "CampusElect" Online Voting System</h1>
          <p>You can vote for your leader with just one tap!</p>
          <Link className="signups" style={{ marginTop: "25px" }} to='/login'>
            <button>Vote Here &nbsp; <i className="fa-solid fa-computer-mouse fa-flip"></i></button>
          </Link>
        </div>
      </div>
      <Foot />
    </>
  );
}

export default Index;
