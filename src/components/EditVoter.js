import { useNavigate, useParams } from "react-router-dom";
import AddVoter from "./AddVoter";
import { useEffect, useState } from "react";
import Axios  from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditVoter()
{
    const navigate=useNavigate();
    const {id} = useParams();
    const [initialValue, setInitialValue] = useState({name:"",Id:"",PhoneNumber:"",Address:"",DateOfBirth:"",Gender:""});
    const [newData,setNewData] = useState([]);
    useEffect(()=>{
        Axios.get("http://localhost:5000/VoterListRoute/update-Voter/"+id)
        .then((res)=>{
            if(res.status === 200){
                const {name,Id,PhoneNumber,Address,DateOfBirth,Gender} = res.data;
                setInitialValue({name,Id,PhoneNumber,Address,DateOfBirth,Gender});
            }
            else
                Promise.reject();
        })
        .catch((err)=>alert(err));
    },[id])

    const getState = (childData) => {
        setNewData(childData);
    }

    const handleSubmit = () => {
        const data = {name:newData[0],Id:newData[1],PhoneNumber:newData[2],Address:newData[3],DateOfBirth:newData[4],Gender:newData[5]};
        Axios.put("http://localhost:5000/VoterListRoute/update-Voter/"+id,data)
        .then((res)=>{
            if(res.status === 200){
                toast.success('Updated Successfully', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                setTimeout(()=>{
                navigate("/Admin/VoterList/"+id);
                },1500)
            }
            else
                Promise.reject();
        })
        .catch((err)=>alert(err));
    }
    return (
        <form onSubmit={handleSubmit}>
            <AddVoter getState={getState}
                        nameValue={initialValue.name}
                        IdValue={initialValue.Id}
                        PhoneNumberValue={initialValue.PhoneNumber}
                        AddressValue={initialValue.Address}
                        DateOfBirthValue={initialValue.DateOfBirth}
                        GenderValue={initialValue.Gender}
                        >
                        Update Voter's Data
                        </AddVoter>
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
        </form>
    )
}
export default EditVoter;
