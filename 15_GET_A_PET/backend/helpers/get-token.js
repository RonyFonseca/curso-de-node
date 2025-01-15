const getToken =(req) => {
    const headers = req.headers.authorization
    const token = headers.split(" ")[1]

    return token
}

export default getToken