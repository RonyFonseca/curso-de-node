import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import api from "../../../utils/api"
import useFlashMessages from "../../../hooks/useFlashMessages"

import styles from "./Dashboard.module.css"

import RoundedImage from "../../Layouts/RondedImage"

function MyPets(){
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem("token") || "")

    useEffect(()=>{
        api.get("/pets/mypets", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=> {
            setPets(response.data.petsUser)
        })
    },[token])


    return (
        <section>
            <div>
                <h1>Meus pets</h1>
                <Link to="/pet/add">Cadastrar pet</Link>
            </div>
            {pets.length > 0 && pets.map((pet) => (
                <div key={pet._id}>
                    <RoundedImage src={`${process.env.REACT_APP_URL_API}/images/pets/${pet.images[0]}`} alt={pet.name} width="75px"/>
                    <span className="bold">{pet.name}</span>
                    <div className={styles.action}>
                        {pet.available ? 
                        (<>
                            {pet.adopter && (
                                <button>Concluir adoção</button>
                            )}
                            <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                            <button>Excluir</button>
                        </>) : (<></>)}
                    </div>
                </div>
            ))}
            {pets.length == 0 && <p>Você não tem pets cadastrados</p>}
        </section>
    )
}

export default MyPets