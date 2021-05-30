import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useHistory } from "react-router-dom";

function Header() {
  const { loggedUser, logOut } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    logOut();
    history.push("/login");
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container-fluid justify-content-end">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        {loggedUser && (
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <a class="nav-link">Todo</a>
              </Link>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <a class="nav-link">Users</a>
              </Link>
            </div>
          </div>
        )}
      </div>
      <form class="container-fluid justify-content-end">
        {loggedUser && (
          <div className="mt-5 bg-white">
            <h3 className="text-black"> Hello, {loggedUser.user_name}</h3>
          </div>
        )}
        <div className="mt-5 justify content-start">
          {loggedUser ? (
            <button
              class="btn btn-sm btn-outline-danger"
              type="button"
              onClick={handleLogout}
            >
              {" "}
              Logout
            </button>
          ) : (
            <>
              <Link to="/sign-up">
                <button class="btn btn-outline-success me-2" type="button">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button class="btn btn-sm btn-outline-secondary" type="button">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </form>
    </nav>
  );
}

export default Header;
