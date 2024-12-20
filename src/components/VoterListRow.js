import Axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VoterListRow(props) {
    const { _id, name, Id, PhoneNumber, Email, Course, Year, Semester, Gender } = props.obj; // Destructuring updated fields

    const handleClick = () => {
        Axios.delete("http://localhost:5000/VoterListRoute/delete-Voter/" + _id)
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
                }
                else
                    Promise.reject();
            })
            .catch((err) => alert(err));
    };

    return (
        <tr className="text-center">
            <td>{name}</td>
            <td>{Id}</td>
            <td>{PhoneNumber}</td>
            <td>{Email}</td>
            <td>{Course}</td>
            <td>{Year}</td>
            <td>{Semester}</td>
            <td>{Gender}</td>
            <td className="d-flex align-items-center justify-content-center">
                <Link className="text-decoration-none text-light" to={"/Admin/EditVoter/" + _id}>
                    <button className="btn btn-warning mr-2" style={{ color: "white" }}>
                        Edit <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                </Link>&ensp;
                <span style={{ cursor: "pointer" }} onClick={handleClick}><i className="fa-solid fa-trash-can"></i></span>
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
            </td>
        </tr>
    );
}

export default VoterListRow;
