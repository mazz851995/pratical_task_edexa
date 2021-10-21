import React, { useEffect, useRef, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileBase from "react-file-base64"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from "react-toastify"


const Signup = () => {
    const history = useHistory()
    const ref = useRef();
    const dispatch = useDispatch()
    const initialFormData = { id: Date.now().toString(), email: "", password: "", fname: "", address: "", proPic: "", dob: "", isSignedIn: false }
    const [postData, setpostData] = useState(initialFormData);

    const users = useSelector(state => state.userReducer)

    const user = users.find(user => user.isSignedIn == true);

    const handleSubmit = (e) => {
        e.preventDefault();
        let { email, password, fname, address, proPic, dob } = postData;

        if (!email || !password || !fname || !address || !proPic || !dob) {
            return toast.warning("Please fill all the details");
        }

        if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return toast.warning("Please enter a valid email");
        }
        const emailExist = users.find(user => user.email == email);

        if (emailExist != undefined) {
            return toast.error("Email already exist..!!");
        }
        postData.dob = new Date(postData.dob).toISOString().split('T')[0];
        dispatch({ type: "SIGNUP_USER", payload: postData })
        history.push("/home");
        toast.success("Signed In Successfully..!!");
    }

    useEffect(() => {
        if (user) {
            history.push("/home");
        }
    }, [dispatch, history, user])

    return (
        <div className="container">
            <h1 className="text-center" >SignUp</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <input value={postData.email} onChange={(e) => setpostData({ ...postData, email: e.target.value })} type="email" className="form-control" name="email" placeholder="Enter Email" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <input value={postData.password} onChange={(e) => setpostData({ ...postData, password: e.target.value })} type="password" className="form-control" name="password" placeholder="Enter password" />
                        </div>
                    </div>
                    <div className="col-sm-6"></div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <input value={postData.fname} onChange={(e) => setpostData({ ...postData, fname: e.target.value })} type="text" className="form-control" name="fname" placeholder="Enter name" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <textarea value={postData.address} onChange={(e) => setpostData({ ...postData, address: e.target.value })} name="address" className="form-control" placeholder="Enter address" rows="3"></textarea>

                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <DatePicker required={true} placeholderText="Select DOB" dateFormat="yyyy-MM-dd" showYearDropdown={true} showMonthDropdown={true} maxDate={Date.now()} className="form-control" selected={postData.dob} onChange={(data) => setpostData({ ...postData, dob: data })} />

                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <FileBase className="form-control" ref={ref} type="file" multiple={false} onDone={(data) => setpostData({ ...postData, proPic: data.base64 })} />

                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-success" > Sign up </button>
                <br />
                <hr />
                Already have an account? <br />
                <button className="btn btn-info" onClick={() => history.push("/login")} >login </button>
            </form>

        </div>
    )
}

export default Signup
