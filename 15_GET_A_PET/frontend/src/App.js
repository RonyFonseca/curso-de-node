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
import Profile from "./components/pages/User/Profile"
import MyPets from "./components/pages/Pet/MyPets"
import AddPet from "./components/pages/Pet/AddPet"
import EditPet from "./components/pages/Pet/EditPet"

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
            <Route path="/user/profile" element={<Profile />}/>
            <Route path="/pet/mypets" element={<MyPets />}/>
            <Route path="/pet/edit/:id" element={<EditPet />}/>
            <Route path="/pet/add" element={<AddPet />}/>
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
