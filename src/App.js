import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ProtectedRoute from './protectedRoute';
import EditUser from './components/EditUser';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_USERS" });
  }, [dispatch])


  return (
    <>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Signup />} />
          {/* <ProtectedRoute exact path="/home" component={Home} /> */}
          <Route exact path="/home" component={() => <Home />} />
          <Route exact path="/edit/:id" component={() => <EditUser />} />
          <Route exact path="/login" component={() => <Login />} />
          <Route component="404 Not found" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
