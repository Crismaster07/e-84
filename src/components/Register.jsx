import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  //set the state of variable using useState hook
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    message: "",
    loggedIn: false,
    navigate: useNavigate(),
  });
  //form submit for login with api
  const formSubmit = (e) => {
    e.preventDefault();
    //create data to hold the values to be passed in to axios
    const data = {
      name: state.name,
      email: state.email,
      password: state.password,
      password_confirmation: state.password_confirmation,
    };
    //include post axios template
    axios
      .post("/register", data)
      .then((response) => {
        //console.log(response);
        //store the token in the Localstorage
        localStorage.setItem("token", response.data.token);
        //set loggedIn status as reference for profile page
        setState({ ...state, loggedIn: true });
        //passed the response data user to props user for header
        props.setUser(response.data.user);
      })
      .catch((error) => {
        //console.log(error);
        setState({ ...state, message: error.response.data.message });
        document.getElementById("submitform").reset();
      });
  };
  //show error messages for frontend
  let err_message = "";
  if (state.message) {
    err_message = (
      <div className="alert alert-danger" role="alert">
        {state.message}
      </div>
    );
  }
  //after loggedin redirect to profile
  if (state.loggedIn) {
    return state.navigate("/profile");
  }

  //start of page return
  return (
    <div>
      <div className="row">
        <div className="bg-light p-5 mt-5 rounded col-lg-4 offset-lg-4">
          <h3 className="text-center">Register New Account</h3>
          <form onSubmit={formSubmit} id="submitform">
            {/* display err_message */}
            {err_message}
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                required
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                required
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                required
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password Confirmation
              </label>
              <input
                type="password"
                className="form-control"
                name="password_confirmation"
                required
                onChange={(e) =>
                  setState({ ...state, password_confirmation: e.target.value })
                }
              />
            </div>
            <div className="d-grid gap-2 mb-2">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Have an account? <Link to="/login">Login here</Link>
            </p>
            <p>
              Forgot My Password <Link to="/forget">click here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
