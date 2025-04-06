import { read } from 'fs'
import cloudinary from '../lib/cloudinary.js'
import Message from '../models/message.model.js'
import User from '../models/message.model.js'

export const getUsersForSidebar = async ( req, res ) => {
    try{
        const loggedUserId = req.user._id
        const filteredUser = await User.find({ _id: { $ne: loggedUserId }}).select("-password")

        res.status(200).json( filteredUser )
    }
    catch( err ){
        console.log("Error in the controller", err.message )
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getMessages = async ( req, res ) => {
    try{
        const { id: userToChatId } = req.param
        const senderId = req.user._id

        const messages = await Message.find({
            $or: [
                { senderId: senderId, reciverId: userToChatId },
                { senderId: userToChatId, reciverId: senderId }
            ]
        })

        res.status(200).json( messages )
    }
    catch( err ){
        console.log("Error in the controller", err.message )
        res.status(500).json({ message: "Internal server error" })
    }
}

export const sendMessage = async ( req, res ) => {
    try{
        const { text, image } = req.body
        const { id: reciverId } = req.param

        const senderId = req.user._id

        let imageUrl
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageUrl,
        })

        await newMessage.save()

        res.status(201).json( newMessage )
        
    }
    catch( err ){
        console.log("Error in the controller", err.message )
        res.status(500).json({ message: "Internal server error" })
    }
}