import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";


const UserAdd = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addRs, setAddRs] = useState('');
    const [mbl,setmbl] = useState('');
    const [oCpsn, setOCpsn] = useState('');
    const [nId, setNId] = useState('');
    const [Advance, setAdvance] = useState('');
    const [AdvanceDate, setAdvanceDate] = useState('');
    const [UserStatus, setUserStatus] = useState('');
    const [usrflt, setUsrflt] = useState('');

    const onHandlrSubmit = async (event) => {
        event.preventDefault();
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
        formData.append('usrflt', usrflt);

      //  headers:{'Content-Type':'multipart/form-data'}

        axios.post('https://mycrud-bcknd.vercel.app/UserAdd', formData).then((response) => {
            console.log(response);
            toast.success('User Added successfully');
        }).catch(error => {
            console.log(error);
            toast.error('Something went wrong!');
        })

    }
    //for flt

    const fltTxt=['FLT-1(B-1(PURBHA))','FLT-1(B-1(POSCIM))',
        'FLT-3(B-1(PURBHA))','FLT-3(B-1(POSCIM))','FLT-4(B-1)',
        'FLT-1(B-2)', 'FLT-2(B-2)', 'FLT-3(B-2)', 'FLT-4(B-2)',
        'FLT-5B-2)', 'RH-1','RH-2','RH-3','RH-4','RH-5']




    return (
        <>
        <form>
            <h1 className="fs-1 text-primary d-flex justify-content-center mt-3">User Add</h1>
            <div className="col-md-8">
                <label htmlFor="userRole" className="form-label">Flat</label>
                <select onChange={(e) => {
                    setUsrflt(e.target.value)
                }} className="form-select" id="userRole">
                    <option selected="">Select Option</option>
                    {
                        fltTxt.map((item, i) => (
                            <option key={i}>{item}</option>
                        ))
                    }
                </select>
            </div>
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">First Name</label>
                    <input required={true} onChange={(e)=>{setFirstName(e.target.value)}} type="text" className="form-control" name="firstName" id="inputEmail4"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Last Name</label>
                    <input required={true} onChange={(e)=>{setLastName(e.target.value)}} type="text" className="form-control" name="lastName"
                           id="inputPassword4"/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input required={true} onChange={(e)=>{setAddRs(e.target.value)}} type="text" className="form-control" name="address" id="inputAddress"
                           placeholder="1234 Main St"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Mobile</label>
                    <input required={true} onChange={(e)=>{setmbl(e.target.value)}} type="text" className="form-control" name="mobile" id="inputPassword4"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Occupation</label>
                    <input required={true} onChange={(e)=>{setOCpsn(e.target.value)}} type="text" className="form-control" name="occupation"
                           id="inputPassword4"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">NID</label>
                    <input required={true} onChange={(e)=>{setNId(e.target.value)}} type="text" className="form-control" name="nid" id="inputPassword4"/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="inputZip" className="form-label">Advance</label>
                    <input onChange={(e)=>{setAdvance(e.target.value)}} type="text" className="form-control" name="adVance" id="inputZip"/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="inputZip" className="form-label">Advance Date</label>
                    <input onChange={(e)=>{setAdvanceDate(e.target.value)}} type="date" className="form-control" name="advncDte" id="inputZip"/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">User Status</label>
                    <select required={true} onChange={(e)=>{setUserStatus(e.target.value)}} id="inputState"
                            name="usrStatus" className="form-select">
                        <option>Active</option>
                        <option>Unactive</option>
                        <option>Pending</option>
                    </select>
                </div>
                <div className="col-12 d-flex justify-content-center mt-3">
                    <button onClick={onHandlrSubmit} type="submit" className="btn btn-primary mx-2">Submit</button>
                    {/*<button type="submit" className="btn btn-primary mx-2" to="/">Back</button>*/}
                </div>
            </div>
        </form>
</>
)
};

export default UserAdd;