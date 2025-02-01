import api from "../utils/api"
import useFlashMessages from "./useFlashMessages.js"

import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

function useAuth(){
    const {setFlashMessage} = useFlashMessages ()

    const [loged, setLoged] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
            api.defaults.headers.Authorization = `Bearer ${token}`
            setLoged(true)
        }
    })

    let msgText = "Cadastro realizado com sucesso"
    let type = "success"

    async function register(user){
        try{
            const data = await api.post('/users/register', user).then((response) => response.data)
            await authUser(data)
        }catch(err){
            msgText = err.response.data.message 
            type = "error"
        }
        setFlashMessage(msgText, type)
    }

    async function authUser (data){
        setLoged(true)
        const token = data.token
        localStorage.setItem("token", token)
        navigate("/")
    }

    function logout(){
        msgText = "Logout feito com sucesso!"
        type="success"
        setLoged(false)
        localStorage.removeItem("token")
        api.defaults.headers.Authorization = undefined
        navigate("/")
        setFlashMessage(msgText, type)
    }

    async function login(user){
        try{
            const data = await api.post('/users/login', user).then((response) => response.data)
            msgText = `Seja bem vindo novamente ${data.name}`
            type = "success"
            authUser(data)
        }catch(err){
            msgText = err.response.data.message 
            type= "error"
        }
        setFlashMessage(msgText, type)
    }

    return {loged,register,logout,login}
}

export default useAuth