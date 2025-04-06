import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async ( req, res, next ) => {
    try{
        const token = req.cookies.jwt

        if(!token) res.status(401).json({ message: "Unauthorized - No token provided" })

        const verifyToken = jwt.verify( token, process.env.JWT_SECRET )

        if(!verifyToken) res.status(401).json({ message: "Unauthorized - Invalid token" })

        const user = await User.findById( verifyToken.userid ).select("-password")

        if(!user) res.status(404).json({ message: "User not found" })

        req.user = user

        next()

    }
    catch( err ){
        console.log("Error in the controller", err.message )
        res.status(500).json({ message: "Internal server error" })
    }
}