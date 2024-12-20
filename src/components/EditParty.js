import { useParams } from "react-router-dom";
import AddParty from "./AddParty";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditParty() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialValue, setInitialValue] = useState({
        Position: "",
        CandidateName: "",
        Image: "",
    });
    const [newData, setNewData] = useState([]); // To hold the new updated data

    useEffect(() => {
        Axios.get(`http://localhost:5000/PartiesRoute/update-Party/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    const { Position, CandidateName, Image } = res.data;
                    setInitialValue({ Position, CandidateName, Image });
                    setNewData([Position, CandidateName, Image]); // Initialize newData with existing data
                } else {
                    Promise.reject();
                }
            })
            .catch((err) => alert(err));
    }, [id]);

    const getState = (childData) => {
        setNewData(childData); // Keep updated data from child component
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate that all fields are filled
        if (!newData[0] || !newData[1] || !newData[2]) {
            toast.error('Please fill in all the fields before submitting.');
            return;
        }

        const data = {
            Position: newData[0],
            CandidateName: newData[1],
            Image: newData[2],
        };

        Axios.put(`http://localhost:5000/PartiesRoute/update-Party/${id}`, data)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Updated Successfully', {
                        position: "bottom-right",
                        autoClose: 1000,
                    });
                    setTimeout(() => {
                        navigate(`/Admin/PartyList/${id}`);
                    }, 1500);
                } else {
                    Promise.reject();
                }
            })
            .catch((err) => toast.error('Error updating party: ' + err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <AddParty
                getState={getState}
                PositionValue={initialValue.Position}
                CandidateNameValue={initialValue.CandidateName}
                ImageValue={initialValue.Image}
            >
                Update Election Data
            </AddParty>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                draggable
                pauseOnHover
                theme="light"
            />
        </form>
    );
}

export default EditParty;
