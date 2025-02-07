import api from "../../utils/api"
import {useState, useEffect} from "react"

import {Link} from "react-router-dom"

import styles from "./Home.module.css"


function Home(){
    const [pets, setPets] = useState([])
    useEffect(()=>{
        api.get("/pets").then((response)=> {
            setPets(response.data.pets)
        },[])
    })
    return (
        <section>
            <div className={styles.pet_home_header}>
                <h1>Todos pets</h1>
                <p>Esta página vai exibir todos os pets, você vai poder ver mais detalhes ou adotar um pet.</p>
            </div>
            <div className={styles.pet_container}>
                {pets.length > 0 && pets.map((pet)=> (
                    <div className={styles.pet_card} key={pet._id}>
                        <div
                            style={{
                            backgroundImage: `url(${process.env.REACT_APP_URL_API}/images/pets/${pet.images[0]})`,
                            }}
                            className={styles.pet_card_image}
                        ></div>
                        <h3>{pet.name}</h3>
                        <p>
                            <span className="bold">Peso:</span> {pet.weight}kg
                        </p>
                        {pet.available ? (<Link to={`pet/${pet._id}`}>Ver mais detalhes</Link>) : (
                            <p className={styles.adopted_text}>Pet ja adotado</p>
                        )}
                    </div>
                ))}
                {pets.length === 0 && (<p>Não há pets cadastrados</p>)}
            </div>
        </section>
    )
}

export default Home