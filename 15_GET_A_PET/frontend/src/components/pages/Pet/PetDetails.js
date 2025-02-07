import {useState, useEffect} from "react"

import {useParams, Link} from "react-router-dom"

import styles from "./PetDetails.module.css"
import api from "../../../utils/api"
import useFlashMessage from "../../../hooks/useFlashMessages"

function PetDetails () {
    const {setFlashMessage} = useFlashMessage()
    const [pet, setPet] = useState({})
    const {id} = useParams()
    const [token] = useState(localStorage.getItem("token"))

    useEffect(()=> {
        api.get(`/pets/${id}`).then((response)=> {
            setPet(response.data.pet)
            return response.data
        }).catch((err) => {
            console.log(err.response.data.message)
        })
    }, [id])

    const schedule = async() => {
        let type = "success" 
        const data = await api.patch(`pets/schedule/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            type="error"
            return err.response.data
        })

        setFlashMessage(data.message, type)
    }

    return (
        <>
            {pet.name && (
                <section className={styles.pet_details_container}>
                    <div className={styles.petdetails_header}>
                        <h1>Conhecendo o pet: {pet.name}</h1>
                        <p>Caso goste do pet você pode agendar uma visita para conhecê-lo melhor.</p>
                    </div>
                    <div className={styles.pet_images}>
                        {pet.images.map((image, index) => (
                            <img src={`${process.env.REACT_APP_URL_API}/images/pets/${image}`} alt={pet.name}/>
                        ))}
                    </div>
                    <div>
                        <p><span className="bold">Peso:</span>{pet.weight} kg</p>
                        <p><span className="bold">Idade:</span>{pet.age} {pet.age > 1 ? ("anos"): ("ano")}</p>
                    </div>
                    <div>
                        {token ? (<button onClick={schedule}>Solicitar visita</button>): (<p>
                            <p>Você tem que <Link to="/register">criar uma conta</Link> para poder adotar.</p>
                        </p>)}
                    </div>
                </section>
            )}
        </>
    )
}

export default PetDetails