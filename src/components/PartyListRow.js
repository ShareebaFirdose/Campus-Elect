import Axios from "axios";
import { Link } from "react-router-dom";
import './PartyList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

function PartyListRow(props) {
    const { _id, Position, CandidateName, Image } = props.obj;
    
    // State for animations
    const [fadeIn, setFadeIn] = useState({ opacity: 0, transform: 'translateY(20px)' });
    const [scale, setScale] = useState({ transform: 'scale(1)' });

    const handleClick = () => {
        // Scale effect on delete click
        setScale({ transform: 'scale(0.9)' });
        
        // Delete request
        Axios.delete("http://localhost:5000/PartiesRoute/delete-Party/" + _id)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Deleted Successfully', {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    Promise.reject();
                }
            })
            .catch((err) => alert(err));
    }

    useEffect(() => {
        // Trigger fade-in effect on mount
        setFadeIn({ opacity: 1, transform: 'translateY(0)' });
    }, []);

    return (
        <div className="col-md-4 col-lg-3" style={{ marginBottom: "20px" }}>
            <div className="card" style={{
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                transition: 'transform 0.2s ease',
                ...fadeIn
            }}>
                <div className="row justify-content-center">
                    <img src={Image} className="mt-3 card-img-top" alt="Party img" style={{ height: "20vh", width: "20vh" }} />
                </div>
                <div className="card-body">
                    <h5 className="card-title"><b>Position&nbsp; &nbsp;:</b> {Position}</h5>
                    <p className="card-text"><b>Candidate Name&nbsp;&nbsp;:</b> {CandidateName}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <Link to={`/Admin/EditParty/${_id}`} style={{ color: "white" }} className="btn btn-warning">Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                    <span 
                        onClick={handleClick} 
                        style={{ cursor: "pointer", ...scale, transition: 'transform 0.2s ease' }} 
                        onAnimationEnd={() => setScale({ transform: 'scale(1)' })} // Reset scale after animation
                    >
                        <i className="fa-solid fa-trash-can"></i>
                    </span>
                </div>
                <ToastContainer
                    position="bottom-right"
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
    );
}

export default PartyListRow;
