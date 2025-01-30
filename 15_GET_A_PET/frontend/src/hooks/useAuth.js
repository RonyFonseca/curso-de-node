import api from "../utils/api"

import {useState, useEffect} from "react"
import {useHistory} from "react-router-dom"

function useAuth(){

    async function register(user){
        try{
            const data = await api.post('/users/register', user).then((response) => response.data)
            console.log(data)
        }catch(err){console.log(err)}
    }

    return {register}
}

export default useAuth