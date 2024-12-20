import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin";
import Candidate from "./Components/Candidate";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/candidate" element={<Candidate />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
