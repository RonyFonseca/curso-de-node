import { useState } from "react"
import stylesForm from "./Form.module.css"
import Input from "./Input"
import OptionsColor from "./OptionsColor"

function FormPet({handleSubmit, petData, btnText}){
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const color = ["Branco", "Preto", "Marrom", "Caramelo", "Mesclado"]

    const onFileChange = (e) => {
        setPreview(Array.from(e.target.files))
        setPet({...pet, images: e.target.files})
    }

    const handleChange = (e) => {
        setPet({...pet, [e.target.name]: e.target.value})
    }

    const handleColor = (e) => {
        setPet({...pet, color: e.target.options[e.target.selectedIndex].text})
    }

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(pet)
    }


    return (
        <form onSubmit={submit} className={stylesForm.form_container}>
            <div className={stylesForm.preview_pet_images}>
                {preview.length > 0 ? preview.map((image, index)=> (
                    <img src={URL.createObjectURL(image)} alt={pet.name} key={`${pet.name}+${index}`}/>
                )):pet.images && pet.images.map((image ,index) => (
                    <img src={`${process.env.REACT_APP_URL_API}/images/pets/${image}`} alt={pet.name} key={`${pet.name}+${index}`} />
                ))}
            </div>
            <Input 
                text="Imagens do pet"
                type="file"
                name="images"
                multiple={true}
                handleOnChange={onFileChange}
            />

            <Input 
                text="Nome do pet"
                type="text"
                name="name"
                placeholder="Digite o nome do pet"
                value={pet.name || ""}
                handleOnChange={handleChange}
            />

            <Input 
                text="Idade do pet"
                type="text"
                name="age"
                placeholder="Digite a idade do pet"
                value={pet.age || ""}
                handleOnChange={handleChange}
            />

            <Input 
                text="Peso do pet"
                type="text"
                name="weight"
                placeholder="Digite o peso do pet"
                value={pet.weight || ""}
                handleOnChange={handleChange}
            />

            <OptionsColor
                name="color"
                text="Selecione a cor"
                options={color}
                handleOnChange={handleColor}
                value={pet.color || ""}
            />

            <input type="submit" value={btnText || ""}/>

        </form>
    )
}

export default FormPet