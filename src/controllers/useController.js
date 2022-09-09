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
    const id = req.query.id //All, id
    const users = await UserService.getAllUsers(id)
    if (!id) {
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

const handleCreateUser = async (req, res) => {
    const data = req.body
    const response = await UserService.createUser(data)
    return res.status(200).json({
        errCode: response.errCode,
        message: response.message,
    })
}

const handleDeleteUser = async (req, res) => {
    const id = req.query.id
    const response = await UserService.deleteUser(id)
    return res.status(200).json({
        errCode: response.errCode,
        message: response.message,
    })
}

const handelEditUser = async (req, res) => {
    const data = req.body
    const response = await UserService.editUser(data)
    return res.status(200).json({
        errCode: response.errCode,
        message: response.message,
    })
}

const getAllCode = async (req, res) => {
    try {
        let data = await UserService.getAllCodeService(req.body.type)
        return res.status(200).json(data)
    }catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    handelEditUser: handelEditUser,
    getAllCode: getAllCode
}