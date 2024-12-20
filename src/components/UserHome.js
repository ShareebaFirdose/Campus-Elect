import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserVotePage from "./UserVotePage";
import UserNav from "./UserNav";
import Foot from './foot';
import './UserHome.css';

function UserHome() {
  const location = useLocation();
  const id = location.pathname.split("/").pop(); 
  const [userData, setUserData] = useState({
    name: "",
    Id: "",
    PhoneNumber: "", 
    Email: "",
    Course: "",  // Expecting course code here
    Year: "",
    Semester: "",
    Gender: ""
  });

  // Mapping of course codes to names
  const courseMapping = {
    "Course 1": "Master's Of Computer Science Application",
    "Course 2": "Master's of Business Administration",
    "Course 3": "Master's in Commerce",
    "Course 4": "Computer Science Engineering"
  };

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/VoterListRoute/get-voter/${id}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setUserData(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [id]);

  // Use the course name from the mapping
  const courseName = courseMapping[userData.Course] || userData.Course;

  return (
    <div>
      <UserNav />
      <div className="container color-change-3x">
        <h1 className="text-center">Your Details <i className="fa-solid fa-circle-info"></i></h1>
        
        <div className="row justify-content-center">
          <div className="col-md-6 mb-4 usernavFont">
            <DetailCard label="Name" value={userData.name} />
            <DetailCard label="Id" value={userData.Id} />
            <DetailCard label="Phone Number" value={userData.PhoneNumber} />
            <DetailCard label="Semester" value={userData.Semester} />
          </div>

          <div className="col-md-6 mb-4">
            <DetailCard label="Email" value={userData.Email} />
            <DetailCard label="Course" value={courseName} /> {/* Use the mapped course name */}
            <DetailCard label="Year" value={userData.Year} />
            <DetailCard label="Gender" value={userData.Gender} />
          </div>
        </div>

        <UserVotePage Id={userData.Id} />
      </div>
      <Foot />
    </div>
  );
}

const DetailCard = ({ label, value }) => (
  <div className="mb-4">
    <p className="detail-label">{label}</p>
    <div className="detail-card">
      <p className="detail-value">{value}</p>
    </div>
  </div>
);

export default UserHome;
