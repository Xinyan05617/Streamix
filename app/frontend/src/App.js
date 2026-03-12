import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Erregistratu from "./Erregistratu";

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