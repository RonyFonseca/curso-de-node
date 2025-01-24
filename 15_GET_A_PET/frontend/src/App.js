import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

// componets
import Footer from "./components/Layouts/Footer"
import Navbar from "./components/Layouts/Navbar"

// paginas
import Home from "./components/pages/Home"
import Login from "./components/pages/Auth/Login"
import Register from "./components/pages/Auth/Register"


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
