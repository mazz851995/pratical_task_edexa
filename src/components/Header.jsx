import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify"

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const logout = () => {
        dispatch({ type: "LOGOUT" })
        history.push("/login");
        toast.success("Logged Out Successfully..!!");
    }

    return (
        <header>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/home" className="navbar-brand">Home</Link>
                    <div className="d-flex">
                        <button className="btn btn-success float-end" onClick={logout} > Logout </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
