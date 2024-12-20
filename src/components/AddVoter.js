import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import './AddVoter.css';
import Foot from './foot';

function AddVoter(props) {
    const [name, setName] = useState("");
    const [Id, setId] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [Email, setEmail] = useState("");
    const [Course, setCourse] = useState("");
    const [Year, setYear] = useState("");
    const [Semester, setSemester] = useState("");
    const [Gender, setGender] = useState("");

    useEffect(() => {
        setName(props.nameValue);
        setId(props.IdValue);
        setPhoneNumber(props.PhoneNumberValue);
        setEmail(props.EmailValue);
        setCourse(props.CourseValue);
        setYear(props.YearValue);
        setSemester(props.SemesterValue);
        setGender(props.GenderValue);
    }, [
        props.nameValue, props.IdValue, props.PhoneNumberValue, 
        props.EmailValue, props.CourseValue, props.YearValue, 
        props.SemesterValue, props.GenderValue
    ]);

    const arr = [name, Id, PhoneNumber, Email, Course, Year, Semester, Gender];

    const handleClick = () => {
        props.getState(arr);
    };

    return (
        <>
            <AdminNav />
            <div className="addVoter">
                <div className="tableVoter" style={{ maxWidth: "50%", margin: "0px auto", textAlign: "center" }}>
                    <table className="table table-borderless caption-top">
                        <caption className="h3 text-center">Voter's Data</caption>
                        <tbody>
                            <tr className="trTable">
                                <td>Name</td>
                                <td>
                                    <input
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        style={{ boxSizing: "border-box" }}
                                        className="form-control tabInput input-lg"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Id</td>
                                <td>
                                    <input
                                        value={Id}
                                        onChange={(event) => setId(event.target.value)}
                                        className="form-control tabInput input-lg"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Phone number</td>
                                <td>
                                    <input
                                        value={PhoneNumber}
                                        onChange={(event) => setPhoneNumber(event.target.value)}
                                        className="form-control tabInput input-lg"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input
                                        value={Email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        className="form-control tabInput input-lg"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Course</td>
                                <td>
                                    <select
                                        value={Course}
                                        onChange={(event) => setCourse(event.target.value)}
                                        className="form-control tabInput input-lg"
                                    >
                                        <option value="">Select Course</option>
                                        <option value="Course 1">Master's Of Computer Science Application</option>
                                        <option value="Course 2">Master's of Business Administration</option>
                                        <option value="Course 3">Master's in Commerce</option>
                                        <option value="Course 4">Computer Science Enginering</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Year</td>
                                <td>
                                    <select
                                        value={Year}
                                        onChange={(event) => setYear(event.target.value)}
                                        className="form-control tabInput input-lg"
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1st">1st Year</option>
                                        <option value="2nd">2nd Year</option>
                                        <option value="3rd">3rd Year</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Semester</td>
                                <td>
                                    <select
                                        value={Semester}
                                        onChange={(event) => setSemester(event.target.value)}
                                        className="form-control tabInput input-lg"
                                    >
                                        <option value="">Select Semester</option>
                                        {Year === "1st" && (
                                            <>
                                                <option value="1st">1st Semester</option>
                                                <option value="2nd">2nd Semester</option>
                                            </>
                                        )}
                                        {Year === "2nd" && (
                                            <>
                                                <option value="3rd">3rd Semester</option>
                                                <option value="4th">4th Semester</option>
                                            </>
                                        )}
                                        {Year === "3rd" && (
                                            <>
                                                <option value="5th">5th Semester</option>
                                                <option value="6th">6th Semester</option>
                                            </>
                                        )}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td style={{ textAlign: "left" }}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="Gender"
                                            value="Male"
                                            checked={Gender === "Male"}
                                            onChange={() => setGender("Male")}
                                        /> Male
                                    </label>
                                    &ensp; &ensp; &ensp;
                                    <label>
                                        <input
                                            type="radio"
                                            name="Gender"
                                            value="Female"
                                            checked={Gender === "Female"}
                                            onChange={() => setGender("Female")}
                                        /> Female
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={"2"}>
                                    <button onClick={handleClick} className="btn btn-warning my-3 d-block mx-auto" style={{ color: "white" }} type="submit">
                                        {props.children}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <footer>
                <Foot />
            </footer>
        </>
    );
}

export default AddVoter;
