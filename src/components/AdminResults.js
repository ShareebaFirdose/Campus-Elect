import AdminNav from "./AdminNav";
import Results from "./Results";
import UserNav from "./UserNav";

export function AdminsResult(){
    return(
        <div>
            <AdminNav/>
            <Results/>
        </div>
    )
}

export function UserResults(){
    return(
        <div>
            <UserNav/>
            <Results/>
        </div>
    )
}