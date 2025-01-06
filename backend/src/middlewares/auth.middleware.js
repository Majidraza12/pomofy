import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
        console.log("Cookies in Req : ",res.cookie)
        const token = req.cookies.jwt
        //Get token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" })
            //No Token thus the User is not Authenticated
        }
        //Since we have the token we have to verify that the token is valid or no to do that , verify the token
        const decodedUserId = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userId = decodedUserId.userId
        if (!userId) {
            return res.status(401).json({message : "Unauthorized -  Invalid Token"})
        }
        //Valid Token -> Find the user in the DB
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        req.user = user
        next() //as this is a middleware
    } catch (error) {
        console.log("Error in protectRoute Middleware", error.message)
        res.status(500).json({message : "Internal Server Error"})
    }
}
