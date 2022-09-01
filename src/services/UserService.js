import db from "../models/index"
import bcrypt from "bcryptjs";

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
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers
}