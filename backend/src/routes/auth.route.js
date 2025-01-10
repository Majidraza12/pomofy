import express from "express"
import { login,signup,logout, checkAuth, forgotPassword, verifyOTP, resetPassword } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"
import { getQuote } from "../controllers/quote.controller.js"
const router = express.Router()
    

// router.get('/signup', (req, res) => {
//     res.send("This is SignUp page")
// })
// router.get('/login', (req, res) => {
//     res.send("This is Login Page")
// })
router.post('/signup', signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/checkAuth",protectRoute,checkAuth)
router.get("/getQuote", getQuote)
router.post("/forgotPassword", forgotPassword)
router.post("/verifyOTP", verifyOTP)
router.post("/resetPassword", resetPassword)


export default router