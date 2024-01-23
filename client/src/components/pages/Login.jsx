import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const apiUrl="http://localhost:4000";
    const [loginDetails, setLoginDetails] = useState({
      username: "",
      password: "",
    })
    const navigate=useNavigate()
    axios.defaults.withCredentials=true
    async function handleSubmit(event) {
      event.preventDefault();
      try {
        const response = await axios.post(`${apiUrl}/login`, loginDetails);
        if (response.data.token) {
          const expirationTime = new Date().getTime() + 60 * 60 * 1000;
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("tokenExpiration", expirationTime);
          setLoginDetails({
            username: "",
            password:''
          })
          navigate("/")
        }
        else{
            alert("Invalid credentials")
            setLoginDetails({
              username: "",
              password:''
            })
            navigate("/login")
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className="container mt-5">
      <h1>Login</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              {/* Makes POST request to /login route */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    onChange={(e) =>{
                        setLoginDetails({
                            ...loginDetails,
                            username:e.target.value
                        })
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={(e) =>{
                        setLoginDetails({
                            ...loginDetails,
                            password:e.target.value
                        })
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-dark mt-2">
                  Login
                </button>
              </form>
              <Link to="/register" className='btn btn-dark mt-3'>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
