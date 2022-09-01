import UserService from "../services/UserService"

let handleLogin = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).json({
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

module.exports = {
    handleLogin: handleLogin
}