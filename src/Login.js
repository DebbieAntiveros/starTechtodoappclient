import React, { Fragment, useState, useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { Redirect, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { setLoggedUser, authenticateUser } = useContext(AuthContext);
  const history = useHistory();

  const handleAuth = async (e) => {
    e.preventDefault();
    authenticateUser(email, password)
      .then((respo) => {
        const { status, message, data } = respo;
        console.log("respo is: ", respo);
        if (status == "success") {
          toast.success(" Login Succesfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          history.push("/dashboard");
        } else {
          toast.error(`${message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <div class="container">
        <div class="row justify-content-center">
          <div class="card text-center">
            <div class="card-body">
              <p class="card-text">
                <form onSubmit={handleAuth}>
                  <h1 className="mt-5"> Login to Your Account </h1>
                  <div className="form-group mt-5">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleAuth}
                  >
                    Submit
                  </button>
                </form>
                <ToastContainer />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
