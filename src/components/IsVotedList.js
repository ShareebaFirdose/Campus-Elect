import React, { useEffect, useState } from "react";
import Axios from "axios";
import IsVotedListRow from './IsVotedListRow';
import AdminNav from "./AdminNav";
import Foot from './foot';

function IsVotedList() {
    const [arr, setArr] = useState([]);

    useEffect(() => {
        fetchVotes();
    }, []);

    const fetchVotes = () => {
        Axios.get("http://localhost:5000/ISVotedRoute/")
            .then((res) => {
                if (res.status === 200) setArr(res.data);
                else Promise.reject();
            })
            .catch((err) => alert(err));
    };

    const ListItems = () => {
        return arr.map((val, ind) => {
            return val.votes.map((vote, idx) => (
                <IsVotedListRow 
                    key={`${ind}-${idx}`} 
                    obj={{ ...vote, Id: val.voterId, _id: val._id }} 
                    onDelete={fetchVotes}
                />
            ));
        });
    };

    return (
        <>
            <AdminNav />
            <div className="votedList"> 
                <div className="container col-md-8">
                    <table className="table pt-5">
                        <thead className="table-active">
                            <tr>
                                <th className="text-center">Voter ID</th>
                                <th className="text-center">Candidate Name</th>
                                <th className="text-center">Position</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ListItems()}
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

export default IsVotedList;