import Login from "./app/auth/login";
import Register from "./app/auth/register";
import Welcome from "./app/auth/welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./app/dashboard/home";
import { ThemeProvider } from "@/components/theme-provider";
import SentimentAnalysis from "./app/dashboard/sentiment-analysis";
import TrackerMood from "./app/dashboard/tracker-mood";
import Journaling from "./app/dashboard/journaling";
import CustomerService from "./app/dashboard/customer-service";
import AnonymousChat from "./app/dashboard/anonymous-chat";
import Forum from "./app/dashboard/forum";
import History from "./app/dashboard/history";
import Aboutus from "./app/dashboard/aboutus";
import Account from "./app/dashboard/account";
import Comment from "./app/dashboard/comment";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/dashboard/home" element={<Home />} />
          <Route path="/dashboard/forum" element={<Forum />} />
          <Route path="/dashboard/comment/:id" element={<Comment />} />
          <Route path="/dashboard/history" element={<History />} />
          <Route path="/dashboard/account" element={<Account />} />
          <Route path="/dashboard/about-us" element={<Aboutus />} />
          <Route
            path="/dashboard/sentiment-analysis"
            element={<SentimentAnalysis />}
          />
          <Route path="/dashboard/tracker-mood" element={<TrackerMood />} />
          <Route path="/dashboard/journaling" element={<Journaling />} />
          <Route
            path="/dashboard/customer-service"
            element={<CustomerService />}
          />
          <Route path="/dashboard/anonymous-chat" element={<AnonymousChat />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
