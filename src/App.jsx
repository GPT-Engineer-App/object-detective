import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import LiveFeed from "./components/LiveFeed.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/live-feed" element={<LiveFeed />} />
      </Routes>
    </Router>
  );
}

export default App;