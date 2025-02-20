import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";


const Users = () => {

    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [flt, setFlt] = useState("");
    const [actualRnt, setActualRnt] = useState(0);
    const [getRnt, setGetRnt] = useState(0);
    const [dueRnt, setDueRnt] = useState(0);
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
        //let fndpayData=  getPayData.find(mydtas=>mydtas.flt===mbl);
      //  console.log(fndpayData);

      //  if(fndpayData){
          //  toast.error('this is for exist')
       // }else{
            axios.post('https://mycrud-bcknd.vercel.app/UserpayAdd', formData).then((response) => {
                console.log(response);
                toast.success('User Added successfully');
            }).catch(error => {
                console.log(error);
                toast.error('Something went wrong!');
            })
      //  }

    }

    const onhndlenumSum=()=>{
        let sum1=parseFloat(actualRnt)
        let sum2=parseFloat(getRnt)
        setDueRnt(sum1-sum2)
    }


  //  const [getPayData, setGetPayData] = useState([]);
  //  const [PayFlt, setPatFlt] = useState("");
  //   useEffect(() => {
  //       async function getData(){
  //         let data= await axios.get('http://localhost:3000/UserpayGet')
  //           console.log(data.data)
  //           setGetPayData(data.data)
  //           setPatFlt(data.data.flt)
  //
  //       }
   //     getData();
  //  },[])

    const fltTxt=['FLT-1(B-1(PURBHA))','FLT-1(B-1(POSCIM))',
        'FLT-3(B-1(PURBHA))','FLT-3(B-1(POSCIM))','FLT-4(B-1)',
        'FLT-1(B-2)', 'FLT-2(B-2)', 'FLT-3(B-2)', 'FLT-4(B-2)',
        'FLT-5B-2)', 'RH-1','RH-2','RH-3','RH-4','RH-5']

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    // search
    const [mbl,setMbl] = useState('');
    const [getData,setGetData] = useState('');
    // const [getRent,setGetRent] = useState('');
    //   const [getMobile,setGetMobile] = useState('');
    //const [flts,setFlts] = useState('');
    const [shwData, setShwData] = useState([]);

    const onSubmit =  (e) => {
        e.preventDefault();
        // if(mbl){
        //     axios.get('http://localhost:3000/UserGet/'+mbl).then((response) => {
        //         console.log(response);
        //         setGetData(response.data[0].firstName +' '+ response.data[0].lastName);
        //         setGetRent(response.data[0].Advance)
        //         setGetMobile(response.data[0].mbl)
        //        // setFlts(response.data[0].usrflt)
        //     })
        // } else {
        //     setGetData('')
        //     setGetRent('')
        //     setGetMobile('')
        //    // setFlts('')
        // }

        let fndData=  getData.find(mydtas=>mydtas.usrflt===mbl);

        if(!fndData){
            setShwData('')


        }else{
            setShwData(fndData);
            console.log(fndData);
            setFullName(fndData?.firstName + " " + fndData?.lastName);
            setMobile(fndData?.mbl);
            setActualRnt(fndData?.Advance);
            setFlt(mbl)
        }

    }

    useEffect(() => {
        async function fetchData() {
            let data=  await axios.get('https://mycrud-bcknd.vercel.app/UserGet')
            console.log(data.data);
            setMbl(data.data.usrflt);
            setGetData(data.data);
        }
        fetchData()
    },[])

    return (
        <>
            <section id="userFormSection">
                <h2>User Pay Form</h2>
                <form className=" row-gap-3 mt-3 m-5">
                    {/*<div className="input-group w-25 mb-3">*/}
                    {/*    <input type="text" className="form-control" placeholder="Search by Recipient's Mobile"*/}
                    {/*           aria-label=" Search by Recipient's Mobile" aria-describedby="button-addon2"/>*/}
                    {/*    /!*<button onClick={onSubmit} className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>*!/*/}
                    {/*</div>*/}
                    <div className="col-md-5">
                        <label htmlFor="userName" className="form-label">Date</label>
                        <input onChange={(e) => {
                            setPayDate(e.target.value)
                        }} type="date" className="form-control" id="userName" placeholder="Enter name"/>
                    </div>
                    <div className="col-md-8">
                        <label htmlFor="userRole" className="form-label">Month</label>
                        <select onChange={(e) => {setPayMonth(e.target.value)}} className="form-select" id="userRole">
                            <option selected="">Select Month</option>
                            {
                                monthNames.map((item, i) => (
                                    <option key={i}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-md-8">
                        <label htmlFor="userRole" className="form-label">Flat</label>
                        <select onClick={ mbl? onSubmit :''} onChange={(e) => {
                            setMbl(e.target.value)}} className="form-select" id="userRole">
                            <option selected="">Select role</option>
                            {
                                fltTxt.map((item, i) => (
                                    <option key={i}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-md-8">
                        <label htmlFor="userName" className="form-label">Name</label>
                        <input value={shwData? shwData?.firstName + " " + shwData?.lastName : ''} onChange={(e)=> {
                            setFullName(e.target.value)
                        }} type="text" className="form-control" id="userName" placeholder="Enter name"/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="userEmail" className="form-label">Mobile</label>
                        <input value={shwData? shwData?.mbl : ''}  onChange={(e) => {setMobile(e.target.value) || setFlt(e.target.value)}} type="text" className="form-control" id="userEmail" placeholder="Enter mobile"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="userEmail" className="form-label">Actual Rent</label>
                        <input onKeyUp={onhndlenumSum} value={shwData? shwData?.Advance : ''}  onChange={(e) => {
                            setActualRnt(e.target.value)}} type="text" className="form-control" id="userEmail" placeholder="Enter rent"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="userEmail" className="form-label">Get Rent</label>
                        <input onKeyUp={onhndlenumSum} onChange={(e) => {
                            setGetRnt(e.target.value)
                        }} type="text" className="form-control" id="userEmail" placeholder="Enter get rent"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="userEmail" className="form-label">Due Rent</label>
                        <input onBeforeInput={onhndlenumSum} value={dueRnt} type="text" className="form-control" id="userEmail" placeholder="Enter due rent"/>
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