import express from "express"
import homeController from "../controllers/homeController"
import useController from "../controllers/useController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayCRUD)
    router.get("/edit-crud", homeController.getEditCRUD)
    router.post("/put-crud", homeController.putEditCRUD)
    router.get("/delete-crud", homeController.deleteCRUD)

    router.post('/api/login', useController.handleLogin)
    router.get('/api/get-all-users', useController.handleGetAllUsers)
    router.post('/api/create-new-user', useController.handleCreateUser)
    router.post('/api/delete-user', useController.handleDeleteUser)
    router.put('/api/edit-user', useController.handelEditUser)
    router.get('/api/allCode', useController.getAllCode)
    return app.use("/", router)
}

module.exports = initWebRoutes;