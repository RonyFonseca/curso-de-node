import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

// componets
import Footer from "./components/Layouts/Footer"
import Navbar from "./components/Layouts/Navbar"
import Container from "./components/Layouts/Container"
import Message from "./components/Layouts/Message"

// paginas
import Home from "./components/pages/Home"
import Login from "./components/pages/Auth/Login"
import Register from "./components/pages/Auth/Register"

// context
import { UserProvider } from "./context/UserContext"


function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
