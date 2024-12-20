import Axios from "axios";
import { useEffect, useState } from "react";
import VoterListRow from './VoterListRow';
import { Link, useLocation } from "react-router-dom";
import AdminNav from "./AdminNav";
import './VoterList.css'; // Ensure the CSS file includes styles for tables
import Foot from './foot'; // Ensure the import is correct

function VotersList() {
    const location = useLocation();
    const id = location.pathname.split("/").pop();
    const [arr, setArr] = useState([]);
    const [genderCounts, setGenderCounts] = useState({ male: 0, female: 0 });
    const [courseGenderCounts, setCourseGenderCounts] = useState({}); // State for gender counts per course

    useEffect(() => {
        const courseNames = {
            "Course 1": "Master's Of Computer Science Application",
            "Course 2": "Master's of Business Administration",
            "Course 3": "Master's in Commerce",
            "Course 4": "Computer Science Engineering",
        };

        Axios.get("http://localhost:5000/VoterListRoute/")
            .then((res) => {
                if (res.status === 200) {
                    const updatedData = res.data.map(voter => ({
                        ...voter,
                        Course: courseNames[voter.Course] || voter.Course
                    }));
                    setArr(updatedData);
                    calculateGenderCounts(updatedData); // Calculate counts after updating data
                } else {
                    Promise.reject();
                }
            })
            .catch((err) => alert(err));
    }, []);

    const calculateGenderCounts = (voters) => {
        const counts = voters.reduce((acc, voter) => {
            // Overall gender counts
            if (voter.Gender.toLowerCase() === 'male') {
                acc.male += 1;
            } else if (voter.Gender.toLowerCase() === 'female') {
                acc.female += 1;
            }

            // Gender counts per course
            const course = voter.Course;
            if (!acc.course[course]) {
                acc.course[course] = { male: 0, female: 0 }; // Initialize counts for new course
            }

            if (voter.Gender.toLowerCase() === 'male') {
                acc.course[course].male += 1;
            } else if (voter.Gender.toLowerCase() === 'female') {
                acc.course[course].female += 1;
            }

            return acc;
        }, { male: 0, female: 0, course: {} });
        
        setGenderCounts({ male: counts.male, female: counts.female });
        setCourseGenderCounts(counts.course); // Update state for course gender counts
    };

    const ListItems = () => {
        return arr.map((val, ind) => {
            return <VoterListRow key={ind} obj={val} />;
        });
    };

    return (
        <>
            <AdminNav />
            <div className="voterListContainer"> {/* Background applied here */}
                <div className="voterList">
                    <div className="vls" style={{ overflowX: "auto" }}>
                        <table className="container table mt-5">
                            <thead className="table-active">
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Id</th>
                                    <th className="text-center">Phone Number</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">Course</th>
                                    <th className="text-center">Year</th>
                                    <th className="text-center">Semester</th>
                                    <th className="text-center">Gender</th>
                                    <th className="text-center">Edit / Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListItems()}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Voter Button */}
                    <div className="addVoterButtonContainer text-center my-4">
                        <Link to={`/Admin/AddVoter/${id}`}>
                            <button className="addVoterButton">
                                <i className="fa-solid fa-plus"></i> Add A Voter
                            </button>
                        </Link>
                    </div>

                    {/* Gender Distribution Table */}
                    <div className="genderDistributionTable mt-5">
                        <h5 className="text-center">Overall Gender Distribution</h5>
                        <table className="table table-bordered mt-3">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-center">Gender</th>
                                    <th className="text-center">Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center">Male</td>
                                    <td className="text-center">{genderCounts.male}</td>
                                </tr>
                                <tr>
                                    <td className="text-center">Female</td>
                                    <td className="text-center">{genderCounts.female}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Gender Distribution by Course Table */}
                    <div className="courseGenderDistributionTable mt-5">
                        <h5 className="text-center">Gender Distribution by Course</h5>
                        <table className="table table-bordered mt-3">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-center">Course</th>
                                    <th className="text-center">Male Count</th>
                                    <th className="text-center">Female Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(courseGenderCounts).map(course => (
                                    <tr key={course}>
                                        <td className="text-center">{course}</td>
                                        <td className="text-center">{courseGenderCounts[course].male}</td>
                                        <td className="text-center">{courseGenderCounts[course].female}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <footer>
                        <Foot />
                    </footer>
                </div>
            </div>
        </>
    );
}

export default VotersList;
