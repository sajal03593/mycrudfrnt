import {useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";


const Users = () => {

    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [flt, setFlt] = useState("");
    const [actualRnt, setActualRnt] = useState("");
    const [getRnt, setGetRnt] = useState("");
    const [dueRnt, setDueRnt] = useState("");
    const [payDate, setPayDate] = useState("");
    const [payStatus, setPayStatus] = useState("");
    const [payMonth, setPayMonth] = useState("");

    const onHandlrSubmit =  (event) => {
        event.preventDefault();
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

        //  headers:{'Content-Type':'multipart/form-data'}

        axios.post('https://mycrud-bcknd.vercel.app/UserpayAdd', formData).then((response) => {
            console.log(response);
            toast.success('User Added successfully');
        }).catch(error => {
            console.log(error);
            toast.error('Something went wrong!');
        })
    }

    const fltTxt=['FLT-1(B-1(PURBHA))','FLT-1(B-1(POSCIM))',
        'FLT-3(B-1(PURBHA))','FLT-3(B-1(POSCIM))','FLT-4(B-1)',
        'FLT-1(B-2)', 'FLT-2(B-2)', 'FLT-3(B-2)', 'FLT-4(B-2)',
        'FLT-5B-2)', 'RH-1','RH-2','RH-3','RH-4','RH-5']


    return (
        <>
            <section id="userFormSection">
                <h2>User Pay Form</h2>
                <form className=" row-gap-3 mt-3 m-5">
                    <div className="col-md-5">
                        <label htmlFor="userName" className="form-label">Date</label>
                        <input onChange={(e) => {
                            setPayDate(e.target.value)
                        }} type="date" className="form-control" id="userName" placeholder="Enter name"/>
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="userName" className="form-label">Month</label>
                        <input onChange={(e) => {
                            setPayMonth(e.target.value)
                        }} type="date" className="form-control" id="userName" placeholder="Enter name"/>
                    </div>
                    <div className="col-md-8">
                        <label htmlFor="userRole" className="form-label">Flat</label>
                        <select onChange={(e) => {
                            setFlt(e.target.value)
                        }} className="form-select" id="userRole">
                            <option selected="">Select role</option>
                            {
                                fltTxt.map((item,i)=> (
                                    <option key={i}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-md-8">
                        <label htmlFor="userName" className="form-label">Name</label>
                        <input onChange={(e) => {
                            setFullName(e.target.value)
                        }} type="text" className="form-control" id="userName" placeholder="Enter name"/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="userEmail" className="form-label">Mobile</label>
                        <input onChange={(e) => {
                            setMobile(e.target.value)
                        }} type="text" className="form-control" id="userEmail" placeholder="Enter mobile"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="userEmail" className="form-label">Actual Rent</label>
                        <input onChange={(e) => {
                            setActualRnt(e.target.value)
                        }} type="text" className="form-control" id="userEmail" placeholder="Enter rent"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="userEmail" className="form-label">Get Rent</label>
                        <input onChange={(e) => {
                            setGetRnt(e.target.value)
                        }} type="text" className="form-control" id="userEmail" placeholder="Enter get rent"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="userEmail" className="form-label">Due Rent</label>
                        <input onChange={(e) => {
                            setDueRnt(e.target.value)
                        }} type="text" className="form-control" id="userEmail" placeholder="Enter due rent"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="userRole" className="form-label">Status</label>
                        <select onChange={(e) => {
                            setPayStatus(e.target.value)
                        }} className="form-select" id="userRole">
                            <option selected="">Select role</option>
                            <option>Complete</option>
                            <option>Pending</option>
                            <option>Due</option>
                        </select>
                    </div>
                    <div className="col-md-5 mt-3">
                        <button onClick={onHandlrSubmit} type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </section>


        </>

    );
};

export default Users;