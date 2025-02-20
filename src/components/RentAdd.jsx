import {useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";


const RentAdd = () => {
    //flt
    const fltTxt=['FLT-1(B-1(PURBHA))','FLT-1(B-1(POSCIM))',
        'FLT-3(B-1(PURBHA))','FLT-3(B-1(POSCIM))','FLT-4(B-1)',
        'FLT-1(B-2)', 'FLT-2(B-2)', 'FLT-3(B-2)', 'FLT-4(B-2)',
        'FLT-5B-2)', 'RH-1','RH-2','RH-3','RH-4','RH-5']

    // rend add
    const [fLt,setFlt]=useState('');
    const [aMnount,setAmmount]=useState('');

    const onHandlrSubmit =  (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('fLt', fLt);
        formData.append('aMnount', aMnount);

        axios.post('https://mycrud-bcknd.vercel.app/rentadd', formData).then((response) => {
            console.log(response);
            toast.success('Rent Added successfully');
        }).catch(error => {
            console.log(error);
            toast.error('Something went wrong!');
        })


    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className=" input-group w-50 mb-3">
                            <span className="input-group-text fw-bold fs-6">Flt</span>
                            <select onChange={(e)=>{setFlt(e.target.value)}} className="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                {
                                    fltTxt.map((item, i) => (
                                        <option key={i}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="input-group w-25 mb-3">
                            <span className="input-group-text fw-bold fs-6">Ammount</span>
                            <input onChange={(e)=>{setAmmount(e.target.value)}} type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
                            <span className="input-group-text">.00</span>
                        </div>
                        <div className="input-group w-25 mb-3">
                            <button onClick={onHandlrSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </>
    );
};

export default RentAdd;