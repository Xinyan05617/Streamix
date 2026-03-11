import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Erregistratu from "./erregistratu";
import Login from "./login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/erregistratu" element={<Erregistratu />} />
      </Routes>
    </Router>
  );
}

export default App;