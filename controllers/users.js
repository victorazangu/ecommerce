import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { countProducts } from './products.js'
import jwt from 'jsonwebtoken'

const createUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(15)
        const password = req.body.password
        const hashedPassword = bcrypt.hashSync(password, salt)

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            street: req.body.street || '',
            apartment: req.body.apartment || '',
            city: req.body.city || '',
            zip: req.body.zip || '',
            country: req.body.country || '',
            mobile: req.body.mobile,
            isAdmin: req.body.isAdmin || false,
        })

        const { password: excludedPassword, ...userWithoutPassword } =
            newUser.toObject()

        res.status(201).json({
            message: 'User created successfully',
            data: userWithoutPassword,
        })
    } catch (e) {
        res.status(500).json({
            message: 'Error creating user',
            error: e.message,
        })
    }
}

const getAllUsers = async (req, res) => {
    await User.find()
        .select('-password')
        .then((user) => {
            res.status(200).json({ message: 'success', data: user })
        })
        .catch((e) => {
            res.status(500).json({
                message: 'Error fetching users',
                error: e.message,
            })
        })
}

const getUserById = async (req, res) => {
    await User.findById(req.params.id)
        .select('-password')
        .then((user) => {
            res.status(200).json({ message: 'success', data: user })
        })
        .catch((e) => {
            res.status(500).json({
                message: 'Error fetching user',
                data: e.message,
            })
        })
}

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const secret = process.env.SECRET
    if (!user) {
        res.status(404).json({ message: 'User not found' })
    }
    const comparePassword = bcrypt.compareSync(req.body.password, user.password)
    if (!comparePassword) {
        res.status(400).json({ message: 'Wrong password' })
    }
    if (user && comparePassword) {
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                isAdmin: user.isAdmin,
            },
            secret,
            {
                expiresIn: '1d',
            }
        )
        res.status(200).json({ token: token })
    }
}
export { createUser, getAllUsers, getUserById, login }
