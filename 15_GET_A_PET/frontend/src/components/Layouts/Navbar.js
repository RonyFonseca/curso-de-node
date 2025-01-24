import {Link} from "react-router-dom"

import Logo from "../../assets/images/logo.png"

function Navbar(){
    return (
        <nav>
            <div>
                <img src={Logo} alt="Logo"/>
                <h2>Get a Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                <li>
                    <Link to="/Login">Login</Link>
                </li>
                <li>
                    <Link to="/Register">Register</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar