import AppRouting from "./config/routes/AppRouting";
import "./App.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <AppRouting />
      <ToastContainer />
    </>
  );
}

export default App;
