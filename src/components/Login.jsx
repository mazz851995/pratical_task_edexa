import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from "react-toastify"

const Login = () => {

    const initialFormData = { email: "", password: "" }
    const [postData, setpostData] = useState(initialFormData);

    const dispatch = useDispatch()
    const history = useHistory()

    const users = useSelector(state => state.userReducer)

    const handleSubmit = (e) => {
        e.preventDefault();
        let { email, password } = postData;
        if (!email || !password) {
            return toast.warning("Please fill all the details");
        }
        if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return toast.warning("Please enter a valid email");
        }
        const user = users.find(user => user.email == postData.email && user.password == postData.password);

        if (!user) {
            return toast.error("Credentials Not found..!!");
        }
        dispatch({ type: "LOGIN_USER", payload: user.id })
        history.push("/home");
        toast.success("Logged In Successfully..!!");
    }
    return (
        <div className='container'>
            <h2 className="text-center" >Login in</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                <div className="mb-3 row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input value={postData.email} onChange={(e) => setpostData({ ...postData, email: e.target.value })} type="text" name="email" className="form-control" placeholder="Enter Email" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input value={postData.password} onChange={(e) => setpostData({ ...postData, password: e.target.value })} type="password" placeholder="Enter Password" name="password" className="form-control" id="inputPassword" />
                    </div>
                </div>
                <button className="btn btn-success" >Login</button>
            </form>
            <hr />
            No Account?
            <br />
            <button className="btn btn-info" onClick={() => history.push("/")} >Sign up</button>
        </div>
    )
}

export default Login
