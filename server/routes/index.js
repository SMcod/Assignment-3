let express = require("express");
let router = express.Router();
let indexController = require("../controller/index");
/* GET home page. */
router.get("/", indexController.displayHomePage);

/* GET home page. */
router.get("/home", indexController.displayHomePage);

/* GET About page. */
router.get("/about", indexController.displayAboutPage);

/* GET Products page. */
router.get("/products", indexController.displayProductPage);

/* GET Services page. */
//router.get("/Workout", indexController.displayWorkoutPage);

/* GET Contact page. */
router.get("/contactus", indexController.displayContactPage);

// get router for login page
router.get("/login", indexController.displayLoginPage);
// post touter and login page
router.post("/login", indexController.processLoginPage);

// get router for registration page
router.get("/register", indexController.displayRegisterPage);
// post router and registeration page
router.post("/register", indexController.ProcessRegisterPage);

// get router for logout page
router.get("/logout", indexController.performLogout);

module.exports = router;
