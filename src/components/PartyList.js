import Axios from "axios";
import { useEffect, useState } from "react";
import PartyListRow from './PartyListRow';
import { Link, useLocation } from "react-router-dom";
import AdminNav from './AdminNav';
import Foot from './foot';
import './PartyList.css';

function PartyList() {
    const location = useLocation();
    const id = location.pathname.split("/").pop();
    const [arr, setArr] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:5000/PartiesRoute/")
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data); // Log the response data for debugging
                    setArr(res.data);
                } else {
                    Promise.reject();
                }
            })
            .catch((err) => alert(err));
    }, []);

    // Group candidates by their positions
    const groupedByPosition = arr.reduce((acc, candidate) => {
        if (!acc[candidate.Position]) {
            acc[candidate.Position] = [];
        }
        acc[candidate.Position].push(candidate);
        return acc;
    }, {});

   // Function to return background color based on position
const getBackgroundColor = (position) => {
    switch (position.toLowerCase()) {
        case 'president':
            return '#ffcccc'; // Light red
        case 'vice-president':
            return '#cce5ff'; // Light blue
        case 'treasurer':
            return '#d1ffd1'; // Light green
        case 'secretary':
            return '#ffb3ff'; // Light pink (updated color for Secretary)
        case 'sports president':
            return '#b3d9ff'; // Light blue
        default:
            return '#f0f0f0'; // Light grey for other positions
    }
};


    return (
        <>
            <AdminNav />
            <div className="partyList">
                <div className="mx-5 partyListflex">
                    <div className="container pt-5">
                        {/* Loop through each position group */}
                        {Object.keys(groupedByPosition).map((position, index) => (
                            <div
                                key={index}
                                className="position-group mb-5"
                                style={{ backgroundColor: getBackgroundColor(position), padding: "20px", borderRadius: "8px" }}
                            >
                                <h2>{position}</h2> {/* Render the position as a heading */}
                                <div className="row">
                                    {/* Render each candidate in the current position */}
                                    {groupedByPosition[position].map((candidate, ind) => (
                                        <PartyListRow key={ind} obj={candidate} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
            <div className="partyList">
  <div className="partyListflex">
    {/* Your content goes here */}
  </div>
</div>

            <footer>
                <Foot />
            </footer>
        </>
    );
}

export default PartyList;
