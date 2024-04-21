import { useEffect } from "react";
import "./App.css";
import { useBrowser } from "./context/browserContext";
import { images } from "./db/images";
import Home from "./pages/Home/Home";
import Task from "./pages/Task/Task";
function App() {
  const index = Math.floor(Math.random() * images.length);
  const bgImage = images[index].image;
  const { name, browserDispatch } = useBrowser();
  console.log("name-", name);
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
