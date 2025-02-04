import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

function MyPets(){
    const [pets, setPets] = useState([])
    return (
        <section>
            <div>
                <h1>Meus pets</h1>
                <Link to="/pet/add">Cadastrar pet</Link>
            </div>
            {pets.length > 0 && <p>Meu pets cadastrados aqui</p>}
            {pets.length === 0 && <p>Você não tem pets cadastrados</p>}
        </section>
    )
}

export default MyPets