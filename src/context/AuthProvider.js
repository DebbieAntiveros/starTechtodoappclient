import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const history = useHistory();
  const authenticateUser = async (email, password) => {
    return new Promise(async (resolve, reject) => {
      const body = { email, password };
      console.log(body);
      try {
        const userLogin = await fetch(
          `https://startechtodoappserver.herokuapp.com/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        const userData = await userLogin.json();
        const { status, message, data } = userData;

        if (status == "success") {
          setLoggedUser(data);
          localStorage.setItem("user", JSON.stringify(data));
          resolve(userData);
        } else {
          resolve(userData);
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  const registerUser = (data) => {
    return new Promise(async (resolve, reject) => {
      console.log("data is: ", data);
      const body = data;
      try {
        const userLogin = await fetch(
          `http://startechtodoappclient.herokuapp.com/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        const userData = await userLogin.json();
        const { status, message, data } = userData;
        if (status == "success") {
          console.log("Success!");
          setLoggedUser(data);
          localStorage.setItem("user", JSON.stringify(data));
          resolve(userData);
        } else {
          resolve(userData);
        }
      } catch (err) {
        console.error(err.message);
        reject(err);
      }
    });
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setLoggedUser(null);
  };

  useEffect(async () => {
    const userData = await localStorage.getItem("user");
    if (userData) {
      setLoggedUser(JSON.parse(userData));
    }
  }, []);

  // useEffect(() => {
  //   console.log("logged user is available: ", loggedUser);
  //   if (loggedUser) history.push("/dashboard");
  // }, [loggedUser]);
  const payload = {
    loggedUser,
    setLoggedUser,
    authenticateUser,
    logOut,
    registerUser,
  };

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

AuthProvider.defaultProps = {};

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AuthProvider;
