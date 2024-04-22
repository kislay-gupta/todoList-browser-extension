import "./task.css";
import { useBrowser } from "../../context/browserContext";
import { useEffect } from "react";
function Task() {
  const { name, time, message, task, browserDispatch } = useBrowser();
  useEffect(() => {
    const userTask = localStorage.setItem("task");
    browserDispatch({
      type: "TASK",
      payload: userTask,
    });
  }, []);
  useEffect(() => {
    getCurrentTime();
  }, [time]);
  const getCurrentTime = () => {
    const todays = new Date();
    const hours = todays.getHours();
    const minutes = todays.getMinutes();
    const hour = hours < 10 ? `0${hours}` : hours;
    const minute = minutes < 10 ? `0${minutes}` : minutes;

    const currentTime = `${hour}:${minute}`;
    setTimeout(getCurrentTime, 1000);
    browserDispatch({
      type: "TIME",
      payload: currentTime,
    });
    browserDispatch({
      type: "MESSAGE",
      payload: hours,
    });
  };
  const handleTaskChange = (event) => {
    if (event.key === "Enter" && event.target.value.length > 0) {
      browserDispatch({
        type: "TASK",
        payload: event.target.value,
      });
      localStorage.setItem("task", event.target.value);
      localStorage.setItem("data", new Date.getDate());
    }
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  // console.log(time);
  return (
    <div className="task-container d-flex direction-column align-center gap">
      <span className="time">{time} </span>
      <span className="message">
        {message}, {name}
      </span>
      {name !== null && task === null ? (
        <>
          <span className="focus-question">
            What is your main focus for today?
          </span>
          <form onSubmit={handleFormSubmit}>
            <input
              required
              className="input task-input"
              onKeyPress={handleTaskChange}
            />
          </form>
        </>
      ) : (
        <>
          <div className="user-task-container">
            <span className="heading-2">Today&apos;s focus</span>
          </div>
          <div>
            <input id="checkbox" type="checkbox" />
            <label htmlFor="checkbox">{task}</label>
          </div>
        </>
      )}
    </div>
  );
}

export default Task;
