//Creating function that generates a JWT token
import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    //userId -> payload
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn : "1d"
    })
    //we create a JWT and we will store it on the users browser using a cookie

    res.cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, //1 day in ms
        httpOnly: true, //http access only more secure
        sameSite: "strict", //CRSF -> prevent cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development" //this should be secure if we are in development mode
    })
}