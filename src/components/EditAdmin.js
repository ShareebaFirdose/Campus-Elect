import { useNavigate, useParams } from "react-router-dom";
import AddAdmin from "./AddAdmin";
import { useEffect, useState } from "react";
import Axios  from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditAdmin()
{
    const navigate=useNavigate();
    const {id} = useParams();
    const [initialValue, setInitialValue] = useState({name:"",username:"",phonenumber:"",email:"",address:"",password:""});
    const [newData,setNewData] = useState([]);
    useEffect(()=>{
        Axios.get("http://localhost:5000/AdminsRoute/update-Admin/"+id)
        .then((res)=>{
            if(res.status === 200){
                const {name,username,phonenumber,email,address,password} = res.data;
                setInitialValue({name,username,phonenumber,email,address,password});
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
        const data = {name:newData[0],username:newData[1],phonenumber:newData[2],email:newData[3],address:newData[4],password:newData[5]};
        Axios.put("http://localhost:5000/AdminsRoute/update-Admin/"+id,data)
        .then((res)=>{
            if(res.status === 200 && id === "6557101be0f629991186bd0f"){
                alert("Record updated successfully")

                    toast.success('Record Updated Successfully', {
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
                    navigate("/Admin/Profile/"+id)
                    },1500)
            }
            else if(res.status === 200 ){
                // alert("Record updated successfully")
                toast.success('Record Updated Successfully', {
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
                        navigate("/Admin/Profile/"+id)
                        },1500)
            }
            else
                Promise.reject();
        })
        .catch((err)=>alert(err));
    }
    return (
        <form onSubmit={handleSubmit}>
            <AddAdmin getState={getState}
                        nameValue={initialValue.name}
                        usernameValue={initialValue.username}
                        phonenumberValue={initialValue.phonenumber}
                        emailValue={initialValue.email}
                        addressValue={initialValue.address}
                        passwordValue={initialValue.password}
                        >
                        Update  Data
                        </AddAdmin>
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
export default EditAdmin;
