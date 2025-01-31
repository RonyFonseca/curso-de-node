import api from "../utils/api"
import useFlashMessages from "./useFlashMessages.js"

function useAuth(){
    const {setFlashMessage} = useFlashMessages()

    let msgText = "Cadastro realizado com sucesso"
    let type = "success"

    async function register(user){
        try{
            const data = await api.post('/users/register', user).then((response) => response.data)
            console.log(data)
        }catch(err){
            msgText = err.response.data.message 
            type = "error"
        }
        setFlashMessage(msgText, type)
    }

    return {register}
}

export default useAuth