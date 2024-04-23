import "./task.css";
import { useBrowser } from "../../context/browserContext";
import { useEffect, useState } from "react";
import { quotes } from "../../db/quotes";
import Todo from "../../components/todo/Todo";
const index = Math.floor(Math.random() * quotes.length);
const quote = quotes[index].quote;
function Task() {
  const [isChecked, setIsChecked] = useState(false);
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const { name, time, message, task, browserDispatch } = useBrowser();
  useEffect(() => {
    const userTask = localStorage.getItem("task");
    browserDispatch({
      type: "TASK",
      payload: userTask,
    });
    if (new Date().getDate() !== Number(localStorage.getItem("date"))) {
      localStorage.removeItem("task");
      localStorage.removeItem("date");
      localStorage.removeItem("checkedStatus");
    }
  }, []);
  useEffect(() => {
    const checkedStatus = localStorage.getItem("checkedStatus");
    checkedStatus === "true" ? setIsChecked(true) : setIsChecked(false);
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
      localStorage.setItem("date", new Date.getDate());
    }
  };
  const handleOnCompleteTaskChange = (event) => {
    if (event.target.checked) {
      setIsChecked((isChecked) => !isChecked);
    } else {
      setIsChecked((isChecked) => !isChecked);
    }
    localStorage.setItem("checkedStatus", !isChecked);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  const handleClearClick = () => {
    browserDispatch({
      type: "CLEAR",
    });
    setIsChecked(false);
    localStorage.removeItem("task");
    localStorage.removeItem("checkedStatus");
  };
  const handleToDoClick = () => {
    setIsTodoOpen(!isTodoOpen);
  };
  // console.log(time);
  return (
    <div className="task-container d-flex direction-column relative align-center gap">
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
          <div className="user-task-container d-flex direction-column align-center gap-sm">
            <span className="heading-2">Today&apos;s focus</span>
            <div className="d-flex align-center gap">
              <label
                className={`${
                  isChecked ? "strike-through" : ""
                } d-flex heading-3 align-center gap-sm cursor`}
              >
                <input
                  className="check cursor"
                  type="checkbox"
                  onChange={handleOnCompleteTaskChange}
                  checked={isChecked}
                />

                {task}
              </label>
              <button className="button cursor" onClick={handleClearClick}>
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
          </div>
        </>
      )}
      <div className="quote-container">
        <span className="heading-3">{quote}</span>
      </div>
      {isTodoOpen && <Todo />}
      <div className="todo-btn-container  absolute">
        <button className="button todo-btn" onClick={handleToDoClick}>
          ToDO
        </button>
      </div>
    </div>
  );
}

export default Task;
