import Axios from "axios";
import { useEffect, useState } from "react";
import AdminListRow from './AdminListRow';
import { Link, useLocation } from "react-router-dom";
import AdminNav from "./AdminNav";
import './AdminList.css'
import Foot from './foot'

function AdminsList(){
    const location = useLocation();
    var id = location.pathname.split("/").pop();
    const [arr,setArr] = useState([]);
    useEffect(()=>{
        Axios.get("http://localhost:5000/AdminsRoute/")
        .then((res)=>{
            if(res.status===200) setArr(res.data);
            else Promise.reject();
        })
        .catch((err)=>alert(err));
    },[])
    const ListItems = () =>{
        return arr.map((val,ind)=>{  //[{},{},{},{}]
            return <AdminListRow  obj={val}/>
        })
    }

    return(
        <>
            <AdminNav/>
        <div className="AdminLists ">
    <div className="alFlex" style={{overflowX:"auto"}}>
            <table  class="container table  mt-5">
            <thead class="table-active ">
                <tr>
                    <th class="text-center">Name</th>
                    <th class="text-center">username</th>
                    <th class="text-center">Phone Number</th>
                    
                    <th class="text-center">email</th>
                    <th class="text-center">address</th>
                    <th class="text-center">password</th>
                    <th class="text-center">Edit / Delete</th>
                </tr>
            </thead>
            <tbody >
                {ListItems()}
            </tbody>
            
        </table>
    <Link className="tcen" to={"/Admin/AddAdmin/"+id}><button class="mx-5 mt-5 btn btn-dark " style={{color:"white"}}><i class="fa-solid fa-plus"></i> Add A Admin</button></Link>
    </div>

        </div>
        <footer>

    <Foot/>
    </footer>
        </>
        
    )
}
export default AdminsList;
