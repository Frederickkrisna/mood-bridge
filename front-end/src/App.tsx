import Login from "./app/auth/login";
import Register from "./app/auth/register";
import Welcome from "./app/auth/welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router basename="mood-bridge">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
