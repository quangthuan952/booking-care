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

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    return res.render("displayCRUD.ejs", {
        dataTable: data
    })
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD
}