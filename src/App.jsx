
import {useState} from "react";
import UserAdd from "./components/UserAdd.jsx";
import Users from "./components/Users.jsx";
import {Toaster} from "react-hot-toast";
import PayAdd from "./components/Pay Add.jsx";
import PayList from "./components/PayList.jsx";





const App = () => {
    const [activeTab, setdSideBar] = useState(null);

    const handleClick = (side) => {
        setdSideBar(side);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-2 sidebar">
                    <h4 className="text-center py-3">Admin Dashboard</h4>
                    <a onClick={() => handleClick('usradd')} href="#">Users Add</a>
                    <a onClick={() => handleClick('usrform')} href='#'>Users</a>
                    <a onClick={() => handleClick('payadd')} href="#">Pay Add</a>
                    <a onClick={() => handleClick('paylist')} href="#">Pay List</a>
                </nav>
                <main className="col-md-10 content">
                     {activeTab === "usrform" && <Users />}
                    {activeTab === "usradd" && <UserAdd/>}
                    {activeTab === "payadd" && <PayAdd/>}
                    {activeTab === "paylist" && <PayList/>}
                </main>
            </div>
            <Toaster/>
        </div>
    );
};

export default App;