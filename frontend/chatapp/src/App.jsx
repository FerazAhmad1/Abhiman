import "./App.css";
import { Routes, Route } from "react-router-dom";
// import LoginSignup from "./components/LoginSignup";
import Message from "./components/Message.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Message />} />
      </Routes>
    </>
  );
}

export default App;
