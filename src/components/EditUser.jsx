import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from "react-toastify"
import Header from './Header';
import FileBase from "react-file-base64"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EditUser = () => {
    const ref = useRef();
    const history = useHistory()
    const users = useSelector(state => state.userReducer)
    const signedInUser = users.find(user => user.isSignedIn == true);

    const dispatch = useDispatch()

    const { id } = useParams()
    if (!id) {
        history.push("/home");
    }
    const initialFormData = { id, email: "", password: "", fname: "", address: "", proPic: "", dob: "" }

    const [postData, setpostData] = useState(initialFormData);

    const [profilePic, setProfilePic] = useState("")

    const userDetail = users.find(user => user.id == id);


    useEffect(() => {
        if (!signedInUser) {
            history.push("/");
        }

        setpostData({
            ...initialFormData,
            email: userDetail ? userDetail.email : "",
            fname: userDetail ? userDetail.fname : "",
            address: userDetail ? userDetail.address : "",
            dob: userDetail ? new Date(userDetail.dob) : ""
        })
        const det = userDetail ? userDetail.proPic : ""
        setProfilePic(det)

    }, [userDetail])


    const handleSubmit = (e) => {
        e.preventDefault();
        let { email, password, fname, address, proPic, dob } = postData;

        if (!email || !fname || !address || !dob) {
            return toast.warning("Please fill all the details");
        }

        if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return toast.warning("Please enter a valid email");
        }
        const emailExist = users.find(user => user.email == email && user.id != id);

        if (emailExist != undefined) {
            return toast.error("Email already exist..!!");
        }
        postData.dob = new Date(postData.dob).toISOString().split('T')[0];

        dispatch({ type: "UPDATE_USER", payload: postData })
        history.push("/home");
        toast.success("User Updated Successfully..!!");
    }


    return (
        <div className="container">
            <Header />
            <hr />
            <h2 className="text-center" >Update your profile</h2>
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
                            <div >
                                <img className="proImage" width="200px" src={profilePic} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-success" > Update </button>
                <button className="btn btn-info" onClick={() => history.push("/home")} >Cancel </button>
            </form>
        </div>
    )
}

export default EditUser
