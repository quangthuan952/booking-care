import db from "../models/index";
import CRUDService from "../services/CRUDService"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (err) {
        console.log(err);
    }
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs")
}

let postCRUD = async (req, res) => {
    const msg = await CRUDService.createNewUser(req.body)
    return res.send(msg)
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserInforById(userId)
        if (userData) {
            return res.render("editCRUD.ejs", {
                userData: userData
            })
        }
    } else {
        return res.send("User not found!")
    }
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    return res.render("displayCRUD.ejs", {
        dataTable: data
    })
}
let putEditCRUD = async (req, res) => {
    let data = req.body
    await CRUDService.updateUser(data)
    res.redirect("/get-crud");
}

let deleteCRUD = async (req, res) => {
  let userId = req.query.id
    await CRUDService.deleteUserById(userId)
    res.redirect("/get-crud");
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putEditCRUD: putEditCRUD,
    deleteCRUD: deleteCRUD
}