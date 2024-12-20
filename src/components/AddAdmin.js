import {useEffect, useState} from "react";
import AdminNav from "./AdminNav";
import './AdminList.css'
import Foot from './foot'
function AddAdmin(props){
    const [name,setname]=useState("");
    const [username,setusername]=useState("");
    const [phonenumber,setphonenumber]=useState("");
    const [address,setaddress]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");

   useEffect(()=>{
    setname(props.nameValue);
    setusername(props.usernameValue);
    setphonenumber(props.phonenumberValue);
    setemail(props.emailValue);
    setaddress(props.addressValue);
    setpassword(props.passwordValue);
   },[props.nameValue,props.usernameValue,props.phonenumberValue,props.emailValue,props.addressValue,props.passwordValue])

   const arr=[name,username,phonenumber,email,address,password];

   const handleClick=()=>{
    props.getState(arr);
   }

    return(
        <>
            <AdminNav/>
        <div className="addAdmin">
        <div className="" style={{maxWidth:"50%",margin:"0px auto",textAlign:"center"}}>
            <table class="table table-borderless caption-top" >
                <caption class="h3 text-center">Admin's Data</caption>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td><input value={name} onChange={(event)=>setname(event.target.value)} style={{boxSizing:"border-box"}} class="form-control input-lg"/></td>
                    </tr>
                    <tr>
                        <td>User Name</td>
                        <td><input value={username} onChange={(event)=>setusername(event.target.value)} class="form-control input-lg"/></td>
                    </tr>
                    <tr>
                        <td>Phone number</td>
                        <td><input value={phonenumber} onChange={(event)=>setphonenumber(event.target.value)} class="form-control input-lg"/></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input value={email} onChange={(event)=>setemail(event.target.value)} class="form-control input-lg"/></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td><input value={address} onChange={(event)=>setaddress(event.target.value)} class="form-control input-lg"/></td>
                    </tr>
                    <tr>
                        <td>password</td>
                        <td><input value={password} onChange={(event)=>setpassword(event.target.value)} class="form-control input-lg"/></td>
                    </tr>
                    <tr >
                        <td colSpan={"2"}><button onClick={handleClick} class="btn btn-warning my-3 d-block mx-auto" type="submit" style={{color:"white"}}>{props.children}</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
        <footer>
            <Foot/>
        </footer>
        </>
    )
}
export default AddAdmin;