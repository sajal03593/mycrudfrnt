import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";


const Users = () => {
    const [getData, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addRs, setAddRs] = useState('');
    const [mbl,setmbl] = useState('');
    const [oCpsn, setOCpsn] = useState('');
    const [nId, setNId] = useState('');
    const [Advance, setAdvance] = useState('');
    const [AdvanceDate, setAdvanceDate] = useState('');
    const [UserStatus, setUserStatus] = useState('');
    const [Id,setId] = useState('');


    const onOpenModal = (item) => {
        setId(item._id);
        setShowModal(true);
        setFirstName(item.firstName);
        setLastName(item.lastName);
        setAdvance(item.Advance);
        setUserStatus(item.UserStatus);
        setAddRs(item.addRs);
        setmbl(item.mbl);
        setOCpsn(item.oCpsn);
        setNId(item.nId);
        setAdvanceDate(item.AdvanceDate);
        console.log(Id)
    }

    const onUpdate = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('addRs', addRs);
        formData.append('mbl', mbl);
        formData.append('oCpsn', oCpsn);
        formData.append('nId', nId);
        formData.append('Advance', Advance);
        formData.append('AdvanceDate', AdvanceDate);
        formData.append('UserStatus', UserStatus);

        axios.put('https://mycrud-bcknd.vercel.app/UserGet/'+Id, formData).then((res) => {
            console.log(res);
            axios.get('https://mycrud-bcknd.vercel.app/UserGet').then((res) => {
                console.log(res);
                setData(res.data);
                setShowModal(false);
                toast.success('User Updated successfully');
                setFndData( res.data.filter(items=>items.UserStatus === 'Unactive'));
            })
        }).catch(error => {
            console.log(error);
            toast.error('Something went wrong!');
        })


    }

    const onHndleUserDelete=(item)=>{
        axios.delete(`https://mycrud-bcknd.vercel.app/UserGet/${item._id}`).then((res) => {
            console.log(res)
            axios.get('https://mycrud-bcknd.vercel.app/UserGet').then((res) => {
                setData(res.data)
                toast.success('User Deleted successfully');
            })
        }).catch(err=>{
            console.log(err)
            toast.error("failed delete created");
        })

    }
   const [fndData, setFndData] = useState([])
   //const [UsrStatus, setUsrStatus] = useState('')
   //  const onhndleUnactive = ()=>{
   //     // console.log(UsrStatus);
   //      let fndData = getData.filter(items=>items.UserStatus === 'Unactive');
   //      console.log(fndData);
   //      setFndData(fndData);
   //  }

    // useEffect(() => {
    //     function getsData() {
    //        let fnDdata = getData.filter(items=>items.UserStatus === 'Unactive');
    //        setFndData(fnDdata);
    //        console.log(fnDdata);
    //    }
    //    getsData();
    // },[])

    useEffect(() => {
        async function fetchData() {
            let data = await axios.get('https://mycrud-bcknd.vercel.app/UserGet')
            console.log(data.data);
            //setData(data.data);
            //setUsrStatus(data.data.UserStatus)
            //==============
            setFndData( data.data.filter(items=>items.UserStatus === 'Unactive'));
          //  console.log(fndData);
          //  setFndData(fndData);
        }
        fetchData();
    },[])

    const onhndleSrch=()=>{
        let input = document.getElementById("searchInput");
        let filter = input.value.toUpperCase();
        let table = document.getElementById("dataTable");
        let tr = table.getElementsByTagName("tr");

        for (let i = 1; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName("td")[2]; // Search by Name column
            if (td) {
                let txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    return (
        <>
            <section id="addUserSection">
                <h2>Add Users</h2>
                <div className="d-flex justify-content-end">
                    {/*<button onClick={onhndleUnactive} className="btn btn-success">Unactive</button>*/}
                </div>
                <div className=" col-md-4 mb-3">
                    <input onKeyUp={onhndleSrch} type="text" id="searchInput" className="form-control"
                           placeholder="search by mobile" aria-label="Recipient's username"
                           aria-describedby="button-addon2"/>
                </div>
                <div className="table-responsive">
                    <table id="dataTable" className="table table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Occopation</th>
                            <th>Unactive/Active</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            fndData.map((item, i) => (
                                <tr key={i.toString()}>
                                    <td>{i + 1}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.mbl}</td>
                                    <td>{item.addRs}</td>
                                    <td>{item.oCpsn}</td>
                                    <td>{item.UserStatus}</td>
                                    <td>{item.AdvanceDate}</td>
                                    <td>
                                        <button type="button" onClick={()=>{onOpenModal(item)}} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm btn-warning mx-2">Edit</button>
                                        <button onClick={()=>{onHndleUserDelete(item)}} className="btn btn-sm btn-danger mx-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </section>

            {
                showModal && (
                    <div id="exampleModal" className="modal" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn-close m-2" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <h1 className="fs-1 text-primary d-flex justify-content-center mt-3">User Add</h1>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label htmlFor="inputEmail4" className="form-label">First Name</label>
                                                <input value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required={true} type="text" className="form-control" name="firstName"
                                                       id="inputEmail4"/>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputPassword4" className="form-label">Last Name</label>
                                                <input value={lastName} onChange={(e)=>{setLastName(e.target.value)}} required={true} type="text" className="form-control" name="lastName"
                                                       id="inputPassword4"/>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="inputAddress" className="form-label">Address</label>
                                                <input value={addRs} onChange={(e)=>{setAddRs(e.target.value)}} required={true} type="text" className="form-control" name="address"
                                                       id="inputAddress"
                                                       placeholder="1234 Main St"/>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputPassword4" className="form-label">Mobile</label>
                                                <input value={mbl} onChange={(e)=>{setmbl(e.target.value)}} required={true} type="text" className="form-control" name="mobile"
                                                       id="inputPassword4"/>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputPassword4" className="form-label">Occupation</label>
                                                <input value={oCpsn} onChange={(e)=>{setOCpsn(e.target.value)}} required={true} type="text" className="form-control"
                                                       name="occupation"
                                                       id="inputPassword4"/>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputPassword4" className="form-label">NID</label>
                                                <input value={nId} onChange={(e)=>{setNId(e.target.value)}} required={true} type="text" className="form-control" name="nid"
                                                       id="inputPassword4"/>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="inputZip" className="form-label">Advance</label>
                                                <input value={Advance} onChange={(e)=>{setAdvance(e.target.value)}} type="text" className="form-control" name="adVance" id="inputZip"/>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="inputZip" className="form-label">Advance Date</label>
                                                <input value={AdvanceDate} onChange={(e)=>{setAdvanceDate(e.target.value)}} type="date" className="form-control" name="advncDte" id="inputZip"/>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="inputState" className="form-label">User Status</label>
                                                <select value={UserStatus} onChange={(e)=>{setUserStatus(e.target.value)}} required={true} id="inputState" name="usrStatus"
                                                        className="form-select">
                                                    <option>Active</option>
                                                    <option>Unactive</option>
                                                    <option>Pending</option>
                                                </select>
                                            </div>
                                            <div className="col-12 d-flex justify-content-center mt-3">
                                                <button onClick={onUpdate} type="submit" className="btn btn-primary mx-2" data-bs-dismiss="modal">Update</button>
                                                {/*<button type="submit" className="btn btn-primary mx-2" to="/">Back</button>*/}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


        </>

    );
};

export default Users;