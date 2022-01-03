import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
