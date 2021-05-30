import React, { Fragment, useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import EditTodo from "./EditTodo";
import InputTodo from "./InputTodo";
import Switch from "react-switch";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  // get and fetch todos
  const getUsers = async () => {
    try {
      const response = await fetch(
        "hhttps://startechtodoappserver.herokuapp.com/viewAllUsers"
      );
      const jsonData = await response.json();
      setUsers(jsonData);
      setDisplayUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchTotalUserCount = async () => {
    try {
      const response = await fetch(
        "https://startechtodoappserver.herokuapp.com/countUsers"
      );
      const jsonData = await response.json();
      console.log("user count is: ", jsonData);
      setUserCount(jsonData[0].count);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
    fetchTotalUserCount();
  }, [users]);

  console.log(users);

  // Table All Users
  return (
    <Fragment>
      <div className="mt-2 text-center bg-white">
        <h1> Registered Users </h1>
      </div>
      <div className="mt-5">
        <table className="table text-center table table table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="colSpan">User ID</th>
              <th scope="colSpan">Username</th>
              <th scope="colSpan">Email Address</th>
            </tr>
          </thead>
          <tbody>
            {displayUsers.map((users) => (
              <React.Fragment key={users.user_id}>
                {" "}
                <tr key={users.user_id}>
                  <td> {users.user_id}</td>
                  <td> {users.user_name}</td>
                  <td> {users.user_email}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <label> Total Users: {userCount} </label>
    </Fragment>
  );
};

export default Users;
