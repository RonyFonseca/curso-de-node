import styles from "./AddPet.module.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../utils/api"
import useFlashMessages from "../../../hooks/useFlashMessages"

import FormPet from "../../form/FormPet"

function AddPet (){
    const [token] = useState(localStorage.getItem("token") ||"")
    const {setFlashMessage} = useFlashMessages()
    const navigate = useNavigate()

    const registerPet = async(pet) => {
        let type="success"
        let msg="O seu pet foi criado"

        const formData = new FormData
        await Object.keys(pet).forEach((key) => {
            if(key == "images"){
                for(let i=0; i<pet[key].length; i++){
                    formData.append("images", pet[key][i])
                }
            }else {
                formData.append(key, pet[key])
            }
        })

        try{
            const data = await api.post("/pets/create", formData, {
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then((response)=> {
                return response.data
            }).catch((err) => {
                msg = err.response.data.message
                type="error"
            })
        }catch(err){
            msg = err.message 
            type="error"
        }
        setFlashMessage(msg, type)
        if(type !== "error"){
            navigate("/pet/mypets")
        }
    }

    return(
        <section>
            <div className={styles.addpet_header}>
                <h1>Cadastre seu pet</h1>
                <p>Depois que cadastrar seu pet ficará disponível para adoção</p>
            </div>
            <FormPet handleSubmit={registerPet} btnText="Criar pet"/>
        </section>
    )
}

export default AddPet