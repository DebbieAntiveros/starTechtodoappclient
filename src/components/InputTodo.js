import React, { Fragment, useState, useContext } from "react";
import TimePicker from "react-time-picker";
import { AuthContext } from "../context/AuthProvider";

const InputTodo = ({ todos, setTodos }) => {
  const { loggedUser } = useContext(AuthContext);
  const [id, setID] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const user_id = loggedUser.user_id;
      const body = { id, user_id, description, date, time, category };
      console.log("body is: ", body);
      const response = await fetch(
        `https://startechtodoappserver.herokuapp.com/todos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const todoUpdated = await response.json();
      const tempTodo = [...todos];
      tempTodo.push(todoUpdated);
      setTodos(tempTodo);
      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  // modal for input data
  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        {" "}
        Add Todo
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {" "}
                Add Todo{" "}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div className="form-group">
                  <label for="exampleInputPassword1">Todo ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={id}
                    onChange={(e) => setID(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Time</label>
                </div>
                <div className="form-group">
                  <TimePicker onChange={(item) => setTime(item)} value={time} />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-success"
                data-dismiss="modal"
                onClick={(e) => onSubmitForm(e)}
              >
                {" "}
                Add{" "}
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={(e) => e}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InputTodo;
