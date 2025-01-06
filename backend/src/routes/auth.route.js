import express from "express"

const router = express.Router()


router.get('/signup', (req, res) => {
    res.send("This is SignUp page")
})
router.get('/login', (req, res) => {
    res.send("This is Login Page")
})


export default router