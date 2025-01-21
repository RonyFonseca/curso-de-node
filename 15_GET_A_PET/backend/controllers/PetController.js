import Pet from "../models/Pet.js"
import getUserToken from "../helpers/get-user-by-token.js"

class PetController {
    static async create(req, res){
        const {name, age, weight, color} = req.body
        const available = true
        const images = req.files

        if(!name){
            res.status(422).json({message: "The name fiel is empty !"})
            return 
        }

        if(!age){
            res.status(422).json({message: "The age fiel is empty !"})
            return 
        }

        if(!weight){
            res.status(422).json({message: "The weight fiel is empty !"})
            return 
        }

        if(!color){
            res.status(422).json({message: "The color fiel is empty !"})
            return 
        }

        if(images.length == 0){
            res.status(422).json({message: "The images fiel is empty !"})
            return 
        }

        const user = await getUserToken(req)

        const pet = new Pet({
            name,
            age,
            color,
            weight,
            images: [],
            available,
            user: {
                _id: user.id,
                name: user.name,
                phone: user.phone,
                image: user.image
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try{
            const newPet = await pet.save()
            res.status(201).json({message: "Sucesso ao criar", newPet})
        }catch(err){
            res.status(200).json({message: err})
        }
        
    }

    static async getAllpets(req, res){
        const pets = await Pet.find().sort("-createdAt")

        res.status(200).json({pets})
    }

    static async getAllPetUser(req, res){
        const userToken = await getUserToken(req)
        const idToken = userToken._id
        
        const petsUser = await Pet.find({"user._id": idToken.toString()}).sort("-createdAt")

        res.status(200).json({petsUser})
    }
}

export default PetController