import React, { useState } from "react";
import AddAdmin from "./AddAdmin";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function CreateAdmin() {
  const location = useLocation();
  var id = location.pathname.split("/").pop();
  const navigate = useNavigate();
  const [arr, setArr] = useState([]);

  const getState = (ChildData) => {
    setArr(ChildData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data_to_be_added = {
      name: arr[0],
      username: arr[1],
      phonenumber: arr[2],
      email: arr[3],
      address: arr[4],
      password: arr[5],
    };
  
    // Check if the username already exists
    Axios.post("http://localhost:5000/AdminsRoute/AddAdmin", data_to_be_added)
      .then((res) => {
        if (res.status === 200) {
          alert("Record added successfully");
          navigate("/Admin/AdminsList/" + id);
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert(err));
  };
  
       
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <AddAdmin
          getState={getState}
          nameValue=""
          usernameValue=""
          phonenumberValue=""
          emailValue=""
          addressValue=""
          passwordValue=""
        >
          Add the Admins Data
        </AddAdmin>
      </form>
    </div>
  );
}

export default CreateAdmin;
