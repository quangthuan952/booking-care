import db from "../models/index"
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            const isExit = await checkUserEmail(email)
            if (isExit) {
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                })
                if (user) {
                    const result = await bcrypt.compareSync(password, user.password)
                    if (result) {
                        userData.errCode = 0
                        userData.errMessage = `OK`
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = `Wrong password`
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = `User is not found`
                }
            } else {
                userData.errCode = 1
                userData.errMessage = `Email is not exist in system`
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({where: {email: userEmail}})
            if (user) {
                resolve(user)
            }
            resolve(false)
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (id && id === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } else if (id && id !== "ALL") {
                users = await db.User.findOne({
                    where: {id: id},
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

const createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (await checkUserEmail(data.email)) {
                resolve({
                    errCode: 1,
                    message: "Email is already!"
                })
            }
            const hashPasswordFromBcrypt = await hashPassword(data.password)
            const user = await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === 1,
                roleId: data.roleId,
                positionId: data.positionId,
                image: data.image,
            })
            resolve({
                errCode: 0,
                message: "Create a new user successfully!"
            })
        } catch (e) {
            reject(e)
        }
    })
}

const hashPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {id: id},
                raw: false
            })
            if (user) {
                await user.destroy()
                resolve({
                    errCode: 0,
                    message: "Delete user successfully!"
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "User not found"
                })
            }
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

const editUser = data => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {id: data.id},
                raw: false
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save()
                resolve({
                    errCode: 0,
                    message: "Update successfully!"
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "User not found!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createUser: createUser,
    deleteUser: deleteUser,
    editUser: editUser
}