import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import AdminNav from "./AdminNav";
import axios from "axios";
import p1 from '../images/voterlist.jpg'
import p2 from '../images/partieslist.jpg'
import p3 from '../images/votedlist.jpg'
import p4 from '../images/results.jpeg'
import p5 from '../images/profile.jpg'
import p6 from '../images/admin.jpg'
import AdminNav from "./AdminNav";
import  './AdminHome.css'
import Foot from './foot'
function AdminHome() {
    const location = useLocation();
    var id = location.pathname.split("/").pop();
  const [votersCount, setVotersCount] = useState(0);
  const [partiesCount, setPartiesCount] = useState(0);
  const [isvotedCount, setisvotedCount] = useState(0);

  useEffect(() => {
    // Fetch voters count
    axios.get("http://localhost:5000/VoterListRoute/Voters-count")
      .then((response) => {
        const count = response.data.count;
        setVotersCount(count);
        console.log(`Total voters count: ${count}`);
      })
      .catch((error) => {
        console.error("Error fetching voters count:", error);
      });

    axios.get("http://localhost:5000/ISVotedRoute/Isvoted-count")
      .then((response) => {
        const count = response.data.count;
        setisvotedCount(count);
        console.log(`Total voters count: ${count}`);
      })
      .catch((error) => {
        console.error("Error fetching voters count:", error);
      });

    // Fetch parties count
    axios.get("http://localhost:5000/PartiesRoute/Parties-count")
      .then((response) => {
        const count = response.data.count;
        setPartiesCount(count);
        console.log(`Total parties count: ${count}`);
      })
      .catch((error) => {
        console.error("Error fetching parties count:", error);
      });
  }, []); 
  const handleLogout=()=>{
        id=null;
        window.location.href=window.location.origin;
  }
    return(
            <>   
            <AdminNav/>
        <div className="adminHomeCol">
            <div>&ensp;</div>
            <div class="container mt-4 ">
                <div class="row g-4 adminHomeCards">
                    <div class="col-lg-4 col-md-6">
                        <div class="card">
                            <img src={p1} style={{height:"300px"}} alt="voter-img" class="card-img-top"></img>
                            <h3 class="card-title text-center">About voters</h3>
                            <div class="card-body">
                                <p className="text-center blink">Total Number of Voters : {votersCount}</p>
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                <Link to={"/Admin/VoterList/"+id}><button class="btn btn-warning" style={{color:"white"}}>Voters List</button></Link>
                                <Link to={"/Admin/AddVoter/"+id}><button class="btn   btn-warning" style={{color:"white"}}><i class="fa-solid fa-plus"></i> Add Voters</button></Link>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="card">
                            <img src={p2} style={{height:"300px"}} alt="voter-img" class="card-img-top"></img>
                            <h3 class="card-title text-center">About Election</h3>
                            <div class="card-body">
                                <p className="text-center blink">Number of Parties Participating : {partiesCount}</p>
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                <Link to={"/Admin/PartyList/"+id}><button class="btn  btn-warning" style={{color:"white"}}>Election List</button></Link>
                                <Link to={"/Admin/AddParty/"+id}><button class="btn  btn-warning" style={{color:"white"}}><i class="fa-solid fa-plus"></i> Add Election</button></Link>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="card">
                            <img src={p3} style={{height:"300px"}} alt="voter-img" class="card-img-top"></img>
                            <h3 class="card-title text-center">Voted List</h3>
                            <div class="card-body">
                            <p className="text-center blink">Number of Voters already Voted : {isvotedCount}</p>
                            </div>
                            <div class="card-footer d-flex justify-content-center">
                                <Link to={"/Admin/IsVotedList/"+id}><button class="btn btn-warning" style={{color:"white"}}>Voted List</button></Link>
                            </div>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center g-4  mb-5">
                    <div class="col-lg-4 col-md-6">
                        <div class="card">
                            <img src={p4} style={{height:"300px"}} alt="voter-img" class="card-img-top"></img>
                            <div class="card-footer d-flex justify-content-center">
                                <Link to={"/Admin/Results/"+id}><button class="btn  btn-warning" style={{color:"white"}}>Results</button></Link>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="card">
                            <img src={p5} style={{height:"300px"}} alt="profile-img" class="card-img-top"></img>
                            <div class="card-footer d-flex justify-content-center">
                                <Link to={"/Admin/Profile/"+id}><button class="btn  btn-warning" style={{color:"white"}}>Profile <i class="fa-solid fa-user"></i></button></Link>
                            </div>
                        </div>
                        
                    </div>
                    {id === "654718d311503067da7ec963" && (<div class="col-lg-4 col-md-6">
                        <div class="card">
                            <img src={p6} style={{height:"300px"}} alt="profile-img" class="card-img-top"></img>
                            <div class="card-footer d-flex justify-content-center">
                                <Link to={"/Admin/AdminsList/"+id}><button class="btn  btn-warning" style={{color:"white"}}>Manage Admins</button></Link>
                            </div>
                        </div>
                        
                    </div>)}
                    
                    </div>
                    
                </div>
            </div>
            
        </div>
        <Foot/>
        </>

        
    )
}
export default AdminHome;