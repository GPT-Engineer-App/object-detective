import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import LiveFeed from "./components/LiveFeed.jsx";
import History from "./pages/History.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/live-feed" element={<LiveFeed />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;