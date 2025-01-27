import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

// componets
import Footer from "./components/Layouts/Footer"
import Navbar from "./components/Layouts/Navbar"
import Container from "./components/Layouts/Container"

// paginas
import Home from "./components/pages/Home"
import Login from "./components/pages/Auth/Login"
import Register from "./components/pages/Auth/Register"


function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
