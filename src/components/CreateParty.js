import { useState } from "react";
import AddParty from "./AddParty";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function CreateParty() {
    const location = useLocation();
    const id = location.pathname.split("/").pop();
    const navigate = useNavigate();
    const [arr, setArr] = useState(["", "", ""]); // Initialize with empty strings

    const getState = (ChildData) => {
        setArr(ChildData); // Update state from child component
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation to ensure all required fields are filled
        if (!arr[0] || !arr[1] || !arr[2]) {
            alert("Please fill in all the fields before submitting.");
            return; // Prevent form submission
        }

        const data_to_be_added = {
            Position: arr[0],        // Include Position
            CandidateName: arr[1],
            Image: arr[2],
        };

        try {
            const res = await Axios.post("http://localhost:5000/PartiesRoute/AddParty", data_to_be_added);
            if (res.status === 200) { // Accept 200 as a successful response
                alert("Record added successfully");
                navigate("/Admin/PartyList/" + id);
            } else {
                throw new Error(`Unexpected response status: ${res.status}`); // Handle unexpected status
            }
        } catch (err) {
            console.error("Error adding party:", err.response ? err.response.data : err.message);
            alert("Error adding party: " + (err.response ? err.response.data : err.message));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <AddParty
                    getState={getState}
                    PartyNameValue={arr[0]}
                    CandidateNameValue={arr[1]}
                    ImageValue={arr[2]}
                    onSubmit={handleSubmit} // Pass the handleSubmit function to trigger it
                >
                    Add the Election Data
                </AddParty>
                <button type="submit">Submit</button> {/* Add a submit button */}
            </form>
        </div>
    );
}

export default CreateParty;
