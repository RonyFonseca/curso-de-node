
const check = (req, res,next) => {
    const UserId = req.session.UserId

    if(!UserId){
        res.redirect('/login')
    }

    next()
} 

export default check