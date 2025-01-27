import {Link} from "react-router-dom"
import styles from "./Navbar.module.css"
import Logo from "../../assets/images/logo.png"

function Navbar(){
    return (
        <nav className={styles.NavBar}>
            <div className={styles.logo}>
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