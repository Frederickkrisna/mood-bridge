import Login from "./app/auth/login";
import Register from "./app/auth/register";
import Welcome from "./app/auth/welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./app/dashboard/home";
import { ThemeProvider } from "@/components/theme-provider";
import TrackerMood from "./app/dashboard/tracker-mood";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/dashboard/home" element={<Home />} />
          <Route path="/dashboard/tracker-mood" element={<TrackerMood/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
