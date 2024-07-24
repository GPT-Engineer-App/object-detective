import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import LiveFeed from "./components/LiveFeed.jsx";
import History from "./pages/History.jsx";
import Settings from "./pages/Settings.jsx";
import Navigation from "./components/Navigation.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow pb-16 sm:pb-0 sm:pt-16">
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route path="/live-feed" element={<LiveFeed />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;