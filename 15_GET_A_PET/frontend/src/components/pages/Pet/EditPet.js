import { useState,useEffect } from "react"

import { useParams } from "react-router-dom"

import api from "../../../utils/api"

import FormPet from "../../form/FormPet"

import useFlashMessages from "../../../hooks/useFlashMessages"

import styles from "./Dashboard.module.css"

function EditPet(){
    const [token] = useState(localStorage.getItem("token"))
    const [pet,setPet] = useState({})
    const {setFlashMessage} = useFlashMessages()
    const {id} = useParams()

    useEffect(() => {
        api.get(`/pets/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setPet(response.data.pet)

        })
    },[token,id])

    const updatePet = async(pet) => {
        let type = 'success'
        let msg

        const formData = new FormData()

        const petFormData = await Object.keys(pet).forEach((key) => {
        if (key === 'images') {
            for (let i = 0; i < pet[key].length; i++) {
            formData.append(`images`, pet[key][i])
            }
        } else {
            formData.append(key, pet[key])
        }
        })

        formData.append('pet', petFormData)

        const data = await api
        .patch(`pets/${pet._id}`, formData, {
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            msg = response.data.message
            return response.data
        })
        .catch((err) => {
            type = 'error'
            return err.response.data
        })

        setFlashMessage(msg, type)
    }
    return (
        <section>
            <div className={styles.addpet_header}>
                <h1>Editando o pet: {pet.name}</h1>
                <p>Depois da edição os dados serão atualizados no sistema.</p>
            </div>
            {pet.name && (
                <FormPet handleSubmit={updatePet} btnText="Atualizar" petData={pet}/>
            )}
        </section>
    )
}

export default EditPet