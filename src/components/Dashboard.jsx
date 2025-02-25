import {useEffect, useState} from "react";
import axios from "axios";



const Dashboard = () => {

    const [getData, setGetData] = useState([]);
    const [findData, setFindData] = useState([]);
    const [unActive, setUnActive] = useState([]);
    const [toTal, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function fechData(){
            let data = await axios.get('https://mycrud-bcknd.vercel.app/UserGet')
           if(data){
               setLoading(false)
               console.log(data.data);
               setGetData(data.data);
               setFindData(data.data.filter(users=>users.UserStatus==='Active').length);
               setUnActive(data.data.filter(users=>users.UserStatus==='Unactive').length);
               const filteredData =data.data.filter((item) => item.Advance > 0); // Example filter condition
               const sum = filteredData.reduce((acc, item) => (acc + item.Advance), 0);
               setTotal(sum);
           }else{
               setLoading(true)
           }
        }
        fechData()
    },[])

    //========= user pay

    const [usersPaycomplete, setUsersPaycomplete] = useState([]);
    const [totalGetpay, setTotalGetpay] = useState([]);
    const [totalDuePay, setTotalDuePay] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            let data= await axios.get('https://mycrud-bcknd.vercel.app/UserpayGet')
            if(data){
                setLoading(false)
                console.log(data.data);
                setUsersPaycomplete(data.data.filter(users=>users.payStatus==='Complete').length);
                // total get pay
                const filteredData =data.data.filter((item) => item.getRnt > 0);
                const sum = filteredData.reduce((acc, item) => (acc + item.getRnt), 0);
                setTotalGetpay(sum)
                //================
                // total due pay
                const filterDue =data.data.filter((item) => item.dueRnt > 0);
                const dueSum = filterDue.reduce((acc, item) => (acc + item.dueRnt), 0);
                setTotalDuePay(dueSum)
                //================
            }else {
                setLoading(true)
            }
        }
        fetchData()
    },[])


    return (
        <>
            <div className="dashboard">
                {
                    loading===true ? 'Please wait...' :(
                        <section className="stats">
                            <div className="stat-card">
                                <h3>Total Users</h3>
                                <p>{getData.length}</p>
                                {/*<button className="btn btn-primary">Total Users</button>*/}
                            </div>
                            <div className="stat-card">
                                <h3>Active</h3>
                                <p>{findData}</p>
                                {/*<button onClick={onhndleTotal} className="btn btn-primary">Total Users</button>*/}
                            </div>
                            <div className="stat-card">
                                <h3>Unactive</h3>
                                <p>{unActive}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Total Advance Taka</h3>
                                <p>{toTal}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Users Due</h3>
                                <p>{usersPaycomplete}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Total Get</h3>
                                <p>{totalGetpay}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Total Due</h3>
                                <p>{totalDuePay}</p>
                            </div>
                        </section>
                    )
                }
            </div>
        </>
    );
};

export default Dashboard;