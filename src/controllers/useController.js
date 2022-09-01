import UserService from "../services/UserService"

let handleLogin = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter"
        })
    }
    const userData = await UserService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

const handleGetAllUsers = async (req, res) => {
    const id = req.body.id //All, id
    const users = await UserService.getAllUsers(id)
    if(!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters",
            users: []
        })
    }
    return res.status(200).json({
        errCode: 0,
        message: "OK",
        users
    })
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}