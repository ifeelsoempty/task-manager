import React, { Component } from "react";
import DeleteButton from "../Buttons/DeleteButton";
import CheckButton from "../Buttons/CheckButton";

class TaskModal extends Component {
  state = {
    description: this.props.taskDOM.innerText,
  };

  componentDidMount() {
    const editTaskInputDOM = document.getElementsByClassName(
      "task-edit-input"
    )[0];
    editTaskInputDOM.select();
  }

  updateTask = () => {
    if (this.state.description.trim() !== "") {
      const task = this.props.task;
      task.description = this.state.description;

      fetch("http://app-react/api/task/update", {
        method: "POST",
        body: JSON.stringify(task),
      })
        .then((res) => res.json())
        .then((res) => this.props.updateTaskInState(res));
    }
  };

  render() {
    const { task, taskDOM, removeTaskModal } = this.props;
    const taskCoordinates = taskDOM.getBoundingClientRect();
    return (
      <div
        id="task-modal"
        className="modal"
        onMouseDown={(e) =>
          e.target.classList.contains("modal") ? removeTaskModal() : false
        }
      >
        <textarea
          onKeyDown={(e) => (e.keyCode === 13 ? this.updateTask() : false)}
          onChange={(e) => this.setState({ description: e.target.value })}
          className="task-edit-input"
          value={this.state.description}
          style={{
            width: `${(taskCoordinates.width / 100) * 86}px`,
            height: `${taskCoordinates.height}px`,
            top: `${taskCoordinates.y}px`,
            left: `${taskCoordinates.x}px`,
          }}
        ></textarea>
        <button
          style={{
            left: `${taskCoordinates.x}px`,
            width: `${(taskCoordinates.width / 100) * 86}px`,
            top: `${taskCoordinates.y}px`,
          }}
          className="task-edit-btns task-accept-btn"
          onClick={this.updateTask}
        >
          Save
        </button>
        <CheckButton
          task={task}
          taskCoordinates={taskCoordinates}
          checkTaskInState={this.props.checkTaskInState}
        />
        <DeleteButton
          task={task}
          taskCoordinates={taskCoordinates}
          deleteTaskFromState={this.props.deleteTaskFromState}
        />
      </div>
    );
  }
}

export default TaskModal;
