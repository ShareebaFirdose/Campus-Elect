import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import Foot from './foot';
import './AddParty.css'; // Import your CSS file

function AddParty(props) {
    // Destructure props for cleaner access
    const { PositionValue, CandidateNameValue, ImageValue, getState, onSubmit, children } = props;

    const [Position, setPosition] = useState("");
    const [CandidateName, setCandidateName] = useState("");
    const [Image, setImage] = useState("");

    // Set initial values based on props
    useEffect(() => {
        setPosition(PositionValue || "");
        setCandidateName(CandidateNameValue || "");
        setImage(ImageValue || "");
    }, [PositionValue, CandidateNameValue, ImageValue]); // Keeping specific props as dependencies

    // Update state in parent component
    useEffect(() => {
        getState([Position, CandidateName, Image]);
    }, [Position, CandidateName, Image, getState]); // Adding getState to dependencies

    return (
        <>
            <AdminNav />
            <div className="addParty color-change-3x"> {/* Add animation class here */}
                <div className="container"> {/* Added the container class for styling */}
                    <table className="table table-borderless caption-top">
                        <caption className="h3 text-center">Election Data</caption>
                        <tbody>
                            <tr>
                                <td>Position</td>
                                <td>
                                    <input
                                        value={Position}
                                        onChange={(event) => setPosition(event.target.value)}
                                        className="form-control input-lg"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Candidate Name</td>
                                <td>
                                    <input
                                        value={CandidateName}
                                        onChange={(event) => setCandidateName(event.target.value)}
                                        className="form-control input-lg"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Image URL</td>
                                <td>
                                    <input
                                        value={Image}
                                        onChange={(event) => setImage(event.target.value)}
                                        className="form-control input-lg"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={"2"}>
                                    <button onClick={onSubmit} className="btn btn-warning my-3 d-block mx-auto" style={{ color: "white" }}>
                                        {children}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <footer>
                    <Foot />
                </footer>
            </div>
        </>
    );
}

export default AddParty;
