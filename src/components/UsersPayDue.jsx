import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import jsPDF from "jspdf";


const UsersPayDue = () => {
    const [getData, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [flt, setFlt] = useState("");
    const [actualRnt, setActualRnt] = useState("");
    const [getRnt, setGetRnt] = useState("");
    const [dueRnt, setDueRnt] = useState("");
    const [payDate, setPayDate] = useState("");
    const [payStatus, setPayStatus] = useState("");
    const [payMonth, setPayMonth] = useState("");
    const [Id,setId] = useState('');


    const onOpenModal = (item) => {
        setId(item._id);
        setShowModal(true);
        setFullName(item.fullName);
        setFlt(item.flt);
        setMobile(item.mobile);
        setActualRnt(item.actualRnt);
        setGetRnt(item.getRnt);
        setDueRnt(item.dueRnt);
        setPayDate(item.payDate);
        setPayStatus(item.payStatus);
        setPayMonth(item.payMonth);
        console.log(Id)
    }

    const onUpdate = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('mobile', mobile);
        formData.append('flt', flt);
        formData.append('actualRnt', actualRnt);
        formData.append('getRnt', getRnt);
        formData.append('dueRnt', dueRnt);
        formData.append('payDate', payDate);
        formData.append('payStatus', payStatus);
        formData.append('payMonth', payMonth);

        axios.put('https://mycrud-bcknd.vercel.app/UserpayGet/'+Id, formData).then((res) => {
            console.log(res);
            axios.get('https://mycrud-bcknd.vercel.app/UserpayGet').then((res) => {
                console.log(res);
                setData(res.data);
                setShowModal(false);
                toast.success('User Updated successfully');
                setFndData( res.data.filter(items=>items.payStatus === 'Due'));
            })
        }).catch(error => {
            console.log(error);
            toast.error('Something went wrong!');
        })


    }

    const onHndleDelete=(item)=>{
        axios.delete(`https://mycrud-bcknd.vercel.app/UserpayGet/${item._id}`).then((res) => {
            console.log(res)
            axios.get('https://mycrud-bcknd.vercel.app/UserpayGet').then((res) => {
                setData(res.data)
                toast.success('User Deleted successfully');
            })
        }).catch(err=>{
            console.log(err)
            toast.error("failed delete created");
        })

    }


    useEffect(() => {
        async function fetchData() {
            let data = await axios.get('https://mycrud-bcknd.vercel.app/UserpayGet')
            console.log(data.data);
            setData(data.data);
        }
        fetchData();
    },[])

    const fltTxt=['FLT-1(B-1(PURBHA))','FLT-1(B-1(POSCIM))',
        'FLT-3(B-1(PURBHA))','FLT-3(B-1(POSCIM))','FLT-4(B-1)',
        'FLT-1(B-2)', 'FLT-2(B-2)', 'FLT-3(B-2)', 'FLT-4(B-2)',
        'FLT-5B-2)', 'RH-1','RH-2','RH-3','RH-4','RH-5']

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const handlePrint = () => {
        const doc = new jsPDF();
        doc.text("Users Pay List", 14, 10);
        doc.autoTable({
            head: [["#", "Flat No", "Full Name", "Mobile", "Actual Rent", "Get Rent", "Due Rent", "Rent Status", "Date", "Month"]],
            body: getData.map((item, i) => [
                i + 1,
                item.flt,
                item.fullName,
                item.mobile,
                item.actualRnt,
                item.getRnt,
                item.dueRnt,
                item.payStatus,
                item.payDate,
                item.payMonth,
            ]),
        });
        doc.save("PayList.pdf");
    };

    //===================

   const [fndData, setFndData] = useState([])

    useEffect(() => {
        async function fetchData() {
            let data = await axios.get('https://mycrud-bcknd.vercel.app/UserpayGet')
            console.log(data.data);
            setFndData( data.data.filter(items=>items.payStatus === 'Due'));
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
                <h2>Users Pay List</h2>
                <div className="d-flex justify-content-end m-2">
                    <button onClick={handlePrint} className="btn btn-success">Print</button>
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
                            <th>Flat No</th>
                            <th>Full Name</th>
                            <th>Mobile</th>
                            <th>Actual Rent</th>
                            <th>Get Rent</th>
                            <th>Due Rent</th>
                            <th>Rent Status</th>
                            <th>Date</th>
                            <th>Month</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            fndData.map((item, i) => (
                                <tr key={i.toString()}>
                                    <td>{i + 1}</td>
                                    <td>{item.flt}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.actualRnt}</td>
                                    <td>{item.getRnt}</td>
                                    <td>{item.dueRnt}</td>
                                    <td>{item.payStatus}</td>
                                    <td>{item.payDate}</td>
                                    <td>{item.payMonth}</td>
                                    <td>
                                        <button type="button" onClick={() => {
                                            onOpenModal(item)
                                        }} data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                className="btn btn-sm btn-warning mx-2">Edit
                                        </button>
                                        <button onClick={() => {
                                            onHndleDelete(item)
                                        }} className="btn btn-sm btn-danger mx-2">Delete
                                        </button>
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
                                    <form className=" row-gap-3 mt-3 m-5">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="userName" className="form-label">Date</label>
                                            <input value={payDate} onChange={(e) => {
                                                setPayDate(e.target.value)
                                            }} type="date" className="form-control" id="userName"
                                                   placeholder="Enter name"/>
                                        </div>
                                        <div className="col-md-8">
                                            <label htmlFor="userRole" className="form-label">Month</label>
                                            <select value={payMonth} onChange={(e) => {setPayMonth(e.target.value)}} className="form-select" id="userRole">
                                                {
                                                    monthNames.map((item, i) => (
                                                        <option key={i}>{item}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className=" col-md-8">
                                            <label htmlFor="userRole" className="form-label">Flat</label>
                                            <select value={flt} onChange={(e) => {
                                                setFlt(e.target.value)
                                            }} className="form-select" id="userRole">
                                                {
                                                    fltTxt.map((item, i) => (
                                                        <option key={i}>{item}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-8">
                                            <label htmlFor="userName" className="form-label">Name</label>
                                            <input value={fullName} onChange={(e) => {
                                                setFullName(e.target.value)
                                            }} type="text" className="form-control" id="userName"
                                                   placeholder="Enter name"/>
                                        </div>
                                        <div className="col-md-7">
                                            <label htmlFor="userEmail" className="form-label">Mobile</label>
                                            <input value={mobile} onChange={(e) => {
                                                setMobile(e.target.value)
                                            }} type="text" className="form-control" id="userEmail"
                                                   placeholder="Enter mobile"/>
                                        </div>
                                        <div className="col-md-7">
                                            <label htmlFor="userEmail" className="form-label">Actual Rent</label>
                                            <input value={actualRnt} onChange={(e) => {
                                                setActualRnt(e.target.value)
                                            }} type="text" className="form-control" id="userEmail"
                                                   placeholder="Enter rent"/>
                                        </div>
                                        <div className="col-md-7">
                                            <label htmlFor="userEmail" className="form-label">Get Rent</label>
                                            <input value={getRnt} onChange={(e) => {
                                                setGetRnt(e.target.value)
                                            }} type="text" className="form-control" id="userEmail"
                                                   placeholder="Enter get rent"/>
                                        </div>
                                        <div className="col-md-7">
                                            <label htmlFor="userEmail" className="form-label">Due Rent</label>
                                            <input value={dueRnt} onChange={(e) => {
                                                setDueRnt(e.target.value)
                                            }} type="text" className="form-control" id="userEmail"
                                                   placeholder="Enter due rent"/>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="userRole" className="form-label">Status</label>
                                            <select value={payStatus} onChange={(e) => {
                                                setPayStatus(e.target.value)
                                            }} className="form-select" id="userRole">
                                                <option selected="">Select Status</option>
                                                <option selected="">Complete</option>
                                                <option selected="">Pending</option>
                                                <option selected="">Due</option>
                                            </select>
                                        </div>
                                        <div className="col-md-5 mt-3">
                                            <button onClick={onUpdate} type="submit" className="btn btn-primary"
                                                    data-bs-dismiss="modal">
                                                Submit
                                            </button>
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

export default UsersPayDue;