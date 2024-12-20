import { useState } from "react";
import AddVoter from "./AddVoter";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function CreateVoter() {
    const location = useLocation();
    const id = location.pathname.split("/").pop(); // Extracting the ID from the URL
    const navigate = useNavigate();
    const [arr, setArr] = useState([]);

    const getState = (ChildData) => {
        setArr(ChildData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data_to_be_added = {
            name: arr[0],
            Id: arr[1],
            PhoneNumber: arr[2],
            Email: arr[3], // Added Email
            Course: arr[4], // Added Course
            Year: arr[5], // Added Year
            Semester: arr[6], // Added Semester
            Gender: arr[7] // Added Gender
        };

        // Checking Whether the Id is already Present in the Data
        const url = 'http://localhost:5000/VoterListRoute';
        const idToCheck = data_to_be_added.Id; 

        if (!idToCheck.trim()) {
            alert("Id must have a value");
            return; // Early return to prevent further execution
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    const foundPerson = data.find(person => person.Id === idToCheck);
                    if (foundPerson) {
                        alert(`ID ${idToCheck} is already present in the data.`);
                    } else {
                        // Adding the new voter
                        Axios.post("http://localhost:5000/VoterListRoute/AddVoter", data_to_be_added)
                            .then((res) => {
                                if (res.status === 201) { // Status 201 for successful creation
                                    alert("Record added successfully");
                                    navigate("/Admin/VoterList/" + id);
                                } else {
                                    throw new Error('Failed to add record');
                                }
                            })
                            .catch((err) => {
                                console.error(err);
                                alert("Error adding record: " + err.message);
                            });
                    }
                } else {
                    console.error('The data structure is not as expected.');
                    alert("Unexpected data structure received.");
                }
            })
            .catch(error => {
                console.error("Fetch error: ", error);
                alert("Error fetching existing voter data: " + error.message);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <AddVoter
                    getState={getState}
                    nameValue=""
                    IdValue=""
                    PhoneNumberValue=""
                    EmailValue="" // Added Email input
                    CourseValue="" // Added Course input
                    YearValue="" // Added Year input
                    SemesterValue="" // Added Semester input
                    GenderValue=""
                >
                    Add the Voter Data
                </AddVoter>
                <button type="submit">Submit</button> {/* Added submit button */}
            </form>
        </div>
    );
}

export default CreateVoter;
