import React from "react";

const DeleteButton = ({ removeModal, task, taskCoordinates }) => {
  function deleteTask() {
    fetch("http://app-react/api/task/delete", {
      method: "POST",
      body: JSON.stringify(task),
    }).then(removeModal);
  }

  return (
    <button
      style={{
        left: `${taskCoordinates.x + (taskCoordinates.width / 100) * 89 - 5}px`,
        top: `${taskCoordinates.y - taskCoordinates.height - 40}px`,
      }}
      className="update-btns delete-btn"
      onClick={deleteTask}
    >
      ✗
    </button>
  );
};

export default DeleteButton;