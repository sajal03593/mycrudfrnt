

const Modal = () => {

    return (
        <div>
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
                                        <input value={firstName} onChange={(e) => {
                                            setFirstName(e.target.value)
                                        }} required={true} type="text" className="form-control" name="firstName"
                                               id="inputEmail4"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputPassword4" className="form-label">Last Name</label>
                                        <input value={lastName} onChange={(e) => {
                                            setLastName(e.target.value)
                                        }} required={true} type="text" className="form-control" name="lastName"
                                               id="inputPassword4"/>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputAddress" className="form-label">Address</label>
                                        <input value={addRs} onChange={(e) => {
                                            setAddRs(e.target.value)
                                        }} required={true} type="text" className="form-control" name="address"
                                               id="inputAddress"
                                               placeholder="1234 Main St"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputPassword4" className="form-label">Mobile</label>
                                        <input value={mbl} onChange={(e) => {
                                            setmbl(e.target.value)
                                        }} required={true} type="text" className="form-control" name="mobile"
                                               id="inputPassword4"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputPassword4" className="form-label">Occupation</label>
                                        <input value={oCpsn} onChange={(e) => {
                                            setOCpsn(e.target.value)
                                        }} required={true} type="text" className="form-control"
                                               name="occupation"
                                               id="inputPassword4"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputPassword4" className="form-label">NID</label>
                                        <input value={nId} onChange={(e) => {
                                            setNId(e.target.value)
                                        }} required={true} type="text" className="form-control" name="nid"
                                               id="inputPassword4"/>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="inputZip" className="form-label">Advance</label>
                                        <input value={Advance} onChange={(e) => {
                                            setAdvance(e.target.value)
                                        }} type="text" className="form-control" name="adVance" id="inputZip"/>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="inputZip" className="form-label">Advance Date</label>
                                        <input value={AdvanceDate} onChange={(e) => {
                                            setAdvanceDate(e.target.value)
                                        }} type="date" className="form-control" name="advncDte" id="inputZip"/>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="inputState" className="form-label">User Status</label>
                                        <select value={UserStatus} onChange={(e) => {
                                            setUserStatus(e.target.value)
                                        }} required={true} id="inputState" name="usrStatus"
                                                className="form-select">
                                            <option>Active</option>
                                            <option>Unactive</option>
                                            <option>Pending</option>
                                        </select>
                                    </div>
                                    <div className="col-12 d-flex justify-content-center mt-3">
                                        <button onClick={onUpdate} type="submit"
                                                className="btn btn-primary mx-2">Update
                                        </button>
                                        {/*<button type="submit" className="btn btn-primary mx-2" to="/">Back</button>*/}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;