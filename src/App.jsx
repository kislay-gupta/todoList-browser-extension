import { useEffect } from "react";
import "./App.css";
import { useBrowser } from "./context/browserContext";
import { images } from "./db/images";
import Home from "./pages/Home/Home";
import Task from "./pages/Task/Task";
const index = Math.floor(Math.random() * images.length);
const bgImage = images[index].image;
function App() {
  const { name, browserDispatch } = useBrowser();
  useEffect(() => {
    const userName = localStorage.getItem("name");
    browserDispatch({
      type: "NAME",
      payload: userName,
    });
  }, []);
  return (
    <div className="app" style={{ backgroundImage: `url("${bgImage}")` }}>
      {name ? <Task /> : <Home />}
    </div>
  );
}

export default App;
