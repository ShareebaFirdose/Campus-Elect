import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function IsVotedListRow(props) {
    const { _id, Id, CandidateName, Position } = props.obj; // Updated object destructuring

    const handleClick = () => {
        axios.delete("http://localhost:5000/ISVotedRoute/delete-isvoted/" + _id)
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
                } else
                    Promise.reject();
            })
            .catch((err) => alert(err));
    }

    return (
        <>
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
            <tr className="text-center">
                <td>{Id}</td>
                <td>{CandidateName}</td>
                <td>{Position}</td>
                <td className="d-flex justify-content-center">
                    <button onClick={handleClick} className="btn btn-secondary">Delete <i className="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>
        </>
    );
}

export default IsVotedListRow;
