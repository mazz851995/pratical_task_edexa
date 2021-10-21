import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from "react-toastify"
import Header from './Header';

const Home = () => {
    const history = useHistory()
    const users = useSelector(state => state.userReducer)
    const signedInUser = users.find(user => user.isSignedIn == true);
    const dispatch = useDispatch()

    const [searchdata, setSearchdata] = useState()
    const [serachString, setSerachString] = useState("")


    // const logout = () => {
    //     dispatch({ type: "LOGOUT" })
    //     history.push("/login");
    //     toast.success("Logged Out Successfully..!!");
    // }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete user?")) {
            dispatch({ type: "DELETE_USER", payload: id })
        }
        return false;
    }

    useEffect(() => {
        const getUsers = users.filter(user => user.fname.toLowerCase().match(serachString) || user.email.toLowerCase().match(serachString));
        setSearchdata(getUsers)
    }, [dispatch, history, toast, users, serachString])


    const handleSearch = (e) => {
        let search = e.target.value.toLowerCase();
        setSerachString(search);
    }


    return (
        <div className="container mt-5">
            <Header />
            <hr />
            <div className="input-group">
                <span className="input-group-text" id="basic-addon1">🔍</span>
                <input type="text" onKeyUp={(e) => handleSearch(e)} className="form-control" name="search" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
            </div>


            <h1 className="text-center" >Welcome {signedInUser ? signedInUser.fname : ""}..!</h1>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Profile Image</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !searchdata ?
                            <tr>
                                <td colSpan={5}>{"No Users found"}</td>
                            </tr>
                            : (
                                searchdata.map((user, i) => {
                                    return (
                                        <tr key={i}>
                                            <th scope="row">{user.id}</th>
                                            <td>{user.fname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.dob}</td>
                                            <td><img width="50px" src={user.proPic} alt="" /></td>
                                            <td>

                                                <div className="btn-group" role="group" aria-label="Basic example">

                                                    {
                                                        user.isSignedIn ?
                                                            <button onClick={() => history.push(`/edit/${user.id}`)} type="button" className="btn btn-primary">Edit</button> : ""
                                                    }

                                                    {
                                                        !user.isSignedIn ?
                                                            <button onClick={() => handleDelete(user.id)} type="button" className="btn btn-danger">Delete</button> : ""
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })

                            )
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Home
