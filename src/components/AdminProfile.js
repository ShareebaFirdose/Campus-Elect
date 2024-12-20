import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import Foot from './foot';

function AdminProfile() {
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [bgColor, setBgColor] = useState("#19dcea"); // Initial background color

  useEffect(() => {
    // Background color animation
    const colors = ["#19dcea", "#b22cff", "#9b59b6"]; // Updated color array (removed red, added purple)
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % colors.length; // Loop through colors
      setBgColor(colors[index]);
    }, 2000); // Change color every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/AdminsRoute/get-admin/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            const user = data;
            setUserData({
              name: user.name,
              username: user.username,
              email: user.email,
              phoneNumber: user.phonenumber,
              address: user.address,
            });
          } else {
            console.error("No user data found for id:", id);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [id]);

  return (
    <div style={{ backgroundColor: bgColor, transition: 'background-color 0.5s ease', height: '100vh' }} className="ffmaily">
      <AdminNav />
      <div className="adminProCol" style={{ height: "20vh" }}></div>
      <div>
        <div className="text-center" style={{ marginTop: "-15vh" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="admin-pic"
            style={{ borderRadius: "50%", height: "30vh" }}
          />
        </div>
      </div>

      <div className="d-flex mt-2 ffmaily">
        <div className="col-lg-6 col-xl-4 mx-auto">
          <div style={{ overflowX: "hidden", whiteSpace: "nowrap" }}>
            <p style={{ paddingLeft: "0.8vh", fontFamily: "serif", fontWeight: "bolder", fontSize: "3vh" }}>
              Admin Name
            </p>
          </div>
          <div style={{ border: "1px solid #D0D0D0", borderRadius: "7px", backgroundColor: "#D0D0D0", overflow: "hidden" }}>
            <p style={{ padding: "1vh 0vh 0vh 1vh", fontFamily: "serif", fontSize: "2.5vh" }}>
              {userData.name}
            </p>
          </div>

          <p style={{ paddingLeft: "0.8vh", fontFamily: "serif", fontWeight: "bolder", fontSize: "3vh" }} className="mt-3">
            User Name
          </p>
          <div style={{ border: "1px solid #D0D0D0", borderRadius: "7px", backgroundColor: "#D0D0D0", overflow: "hidden" }}>
            <p style={{ padding: "1vh 0vh 0vh 1vh", fontFamily: "serif", fontSize: "2.5vh" }}>
              {userData.username}
            </p>
          </div>
          <div style={{ overflowX: "hidden", whiteSpace: "nowrap" }}>
            <p style={{ paddingLeft: "0.8vh", fontFamily: "serif", fontWeight: "bolder", fontSize: "3vh" }} className="mt-3">
              Phone Number
            </p>
          </div>
          <div style={{ border: "1px solid #D0D0D0", borderRadius: "7px", backgroundColor: "#D0D0D0", overflow: "hidden" }}>
            <p style={{ padding: "1vh 0vh 0vh 1vh", fontFamily: "serif", fontSize: "2.5vh" }}>
              {userData.phoneNumber}
            </p>
          </div>

          <p style={{ paddingLeft: "0.8vh", fontFamily: "serif", fontWeight: "bolder", fontSize: "3vh" }} className="mt-3">
            Email
          </p>
          <div style={{ border: "1px solid #D0D0D0", borderRadius: "7px", backgroundColor: "#D0D0D0", overflow: "hidden" }}>
            <p style={{ padding: "1vh 0vh 0vh 1vh", fontFamily: "serif", fontSize: "2.5vh" }}>
              {userData.email}
            </p>
          </div>

          <p style={{ paddingLeft: "0.8vh", fontFamily: "serif", fontWeight: "bolder", fontSize: "3vh" }} className="mt-3 ">
            Address
          </p>
          <div style={{ border: "1px solid #D0D0D0", borderRadius: "7px", backgroundColor: "#D0D0D0", overflow: "hidden" }} className="mb-5">
            <p style={{ padding: "1vh 0vh 0vh 1vh", fontFamily: "serif", fontSize: "2.5vh" }}>
              {userData.address}
            </p>
          </div>
          <div className="text-center">
            <Link to={"/Admin/EditAdmin/" + id}>
              <button className="btn mb-5 btn-warning" style={{ color: "White" }}>
                Edit Data <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
}

export default AdminProfile;
