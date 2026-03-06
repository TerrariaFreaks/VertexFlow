import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register an user
export const registerUser = async(req, res) => {
    try {
        const {email, username, password} = req.body

        if (!email || !username || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const existingUser = await User.findOne({
            $or: [{email}, {username}]
        })

        if (existingUser){
            return res.status(400).json({message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await User.create({
            email: email,
            username: username,
            password: hashedPassword
        });

        res.status(201).json({message: "User successfully created"});
    } catch (error){
        res.status(500).json({messgae: error.message})
    }
}

// Login
export const loginUser = async(req, res) => {
    try {
        const {identifier, password} = req.body

        if (!identifier || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const user = await User.findOne({
            $or: [{email: identifier}, {username: identifier}]
        });

        if (!user){
            return res.status(400).json({message: "Invalid username or email"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.status(400).json({message: "Invalid password"})
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        res.json({token});

    } catch(error){
        res.staus(500).json({message: error.message})
    }

}