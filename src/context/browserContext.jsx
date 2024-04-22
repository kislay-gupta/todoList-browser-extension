import { createContext, useContext, useReducer } from "react";
import { browserReducer } from "../reducer/browserReducer";
const initialValue = {
  name: "",
  time: "",
  message: "",
  task: null,
};
const BrowserContext = createContext(initialValue);

// eslint-disable-next-line react/prop-types
const BrowserProvider = ({ children }) => {
  const [{ name, time, message, task }, browserDispatch] = useReducer(
    browserReducer,
    initialValue
  );
  return (
    <BrowserContext.Provider
      value={{ name, time, message, task, browserDispatch }}
    >
      {children}
    </BrowserContext.Provider>
  );
};

const useBrowser = () => useContext(BrowserContext);

export { useBrowser, BrowserProvider };
