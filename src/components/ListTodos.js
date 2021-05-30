import React, { Fragment, useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import EditTodo from "./EditTodo";
import InputTodo from "./InputTodo";
import Switch from "react-switch";
import { Link } from "react-router-dom";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const [displayTodos, setDisplayTodos] = useState([]);

  const [todosWithUser, setTodosWithUser] = useState([]);
  const [displayTodosWithUser, setDisplayTodosWithUser] = useState([]);

  const [isPrivate, setIsPrivate] = useState(false);
  const { loggedUser } = useContext(AuthContext);
  const [withUserName, setWithUserName] = useState("without");

  const deleteAllTodos = async () => {
    console.log("delete all todos clicked");
    try {
      const deleteTodo = await fetch(
        `http://localhost:5000/storedFunctionTodo/${loggedUser.user_id}`,
        {
          method: "DELETE",
        }
      );
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => deleteTodo.todo_id != todo.todo_id));
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };
  // get and fetch todos
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
      setDisplayTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodosWithUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/joinTodo");
      const jsonData = await response.json();
      console.log("todo with user is: ", jsonData);
      setTodosWithUser(jsonData);
      setDisplayTodosWithUser(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    getTodosWithUsers();
  }, [todos]);

  useEffect(() => {
    if (isPrivate == false) {
      setDisplayTodos(todos);
      setDisplayTodosWithUser(todosWithUser);
    } else {
      setDisplayTodos(
        todos.filter((item) => item.user_id == loggedUser.user_id)
      );

      setDisplayTodosWithUser(
        todosWithUser.filter((item) => item.user_id == loggedUser.user_id)
      );
    }
  }, [todos]);

  console.log(todos);

  const handleToggle = () => {
    console.log("logged user is: ", loggedUser);
    if (isPrivate == true) {
      setDisplayTodos(todos);
      setDisplayTodosWithUser(todosWithUser);

      setIsPrivate(false);
    } else {
      setDisplayTodos(
        todos.filter((item) => item.user_id == loggedUser.user_id)
      );
      setDisplayTodosWithUser(
        todosWithUser.filter((item) => item.user_id == loggedUser.user_id)
      );
      setIsPrivate(true);
    }
  };

  const handleUserToggle = (e) => {
    setWithUserName(e.target.value);
  };

  // Table for the data
  return (
    <Fragment>
      <div className="p-3 text-center bg-white">
        <h1> Todo List </h1>
        <InputTodo todos={todos} setTodos={setTodos} />
        <button
          type="button justify"
          class="btn btn-danger"
          onClick={deleteAllTodos}
        >
          Delete all
        </button>
      </div>
      <Switch onChange={handleToggle} checked={isPrivate} />
      <div className="radio">
        <label>
          <input
            type="radio"
            value="with"
            checked={withUserName == "with"}
            onChange={handleUserToggle}
          />
          With Username
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="without"
            checked={withUserName == "without"}
            onChange={handleUserToggle}
          />
          Without Username
        </label>
      </div>
      <table className="table text-center table table table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="colSpan">ID</th>
            <th scope="colSpan">Description</th>
            <th scope="colSpan">Date</th>
            <th scope="colSpan">Time</th>
            <th scope="colSpan">Category</th>
            <th scope="colSpan">Action</th>
            {withUserName == "with" && (
              <>
                <th scope="colSpan">User Name</th>
                <th scope="colSpan">Email</th>{" "}
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {withUserName == "with"
            ? displayTodosWithUser.map((todo) => (
                <React.Fragment key={todo.todo_id}>
                  <tr key={todo.todo_id}>
                    <td> {todo.todo_id}</td>
                    <td>{todo.description}</td>
                    <td> {todo.date.substr(0, 10)}</td>
                    <td> {todo.time}</td>
                    <td> {todo.category}</td>
                    <td>{todo.user_name}</td>
                    <td>{todo.user_email}</td>

                    <td>
                      <EditTodo
                        todo={todo}
                        key={todo.todo_id}
                        setTodos={setTodos}
                      />
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteTodo(todo.todo_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            : displayTodos.map((todo) => (
                <React.Fragment key={todo.todo_id}>
                  <tr key={todo.todo_id}>
                    <td> {todo.todo_id}</td>
                    <td>{todo.description}</td>
                    <td> {todo.date.substr(0, 10)}</td>
                    <td> {todo.time}</td>
                    <td> {todo.category}</td>
                    <td>
                      <EditTodo
                        todo={todo}
                        key={todo.todo_id}
                        setTodos={setTodos}
                      />
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteTodo(todo.todo_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
