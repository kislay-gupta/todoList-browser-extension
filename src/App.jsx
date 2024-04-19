import "./App.css";
import { images } from "./db/images";
import Home from "./pages/Home/Home";
function App() {
  const index = Math.floor(Math.random() * images.length);
  const bgImage = images[index].image;
  return (
    <div className="app" style={{ backgroundImage: `url("${bgImage}")` }}>
      <Home />
    </div>
  );
}

export default App;
