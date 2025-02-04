import styles from "./AddPet.module.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../utils/api"
import useFlashMessages from "../../../hooks/useFlashMessages"

function AddPet (){
    return(
        <section>
            <div className={styles.addpet_header}>
                <h1>Cadastre seu pet</h1>
                <p>Depois que cadastrar seu pet ficará disponível para adoção</p>
            </div>
            <div>Formulário</div>
        </section>
    )
}

export default AddPet