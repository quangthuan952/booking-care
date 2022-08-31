import bcrypt from "bcryptjs"
import db from "../models/index"
import {reject} from "bcrypt/promises";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasswordFromBcrypt = await hashPasswordUser(data.password)
            await db.User.create({
                email: data.email,
                password: data.hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === 1,
                roleId: data.roleId
            })
            resolve('Create a new user successfully!')
        } catch (e) {
            reject(e)
        }
    })
}

let hashPasswordUser = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createNewUser: createNewUser
}