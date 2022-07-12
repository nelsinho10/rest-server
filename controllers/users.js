import { request, response } from 'express'
import bcryptjs from 'bcryptjs'
import User from '../models/User.js'

export const getUsers = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query

    const query = { state: true }

    const [total, users] = await Promise.all([
        User.count(query),
        User.find(query).skip(Number(from)).limit(Number(limit)),
    ])

    res.json({
        total,
        users,
    })
}

export const postUsers = async (req = request, res = response) => {
    const { name, email, password, rol } = req.body
    const user = new User({
        name,
        email,
        password,
        rol,
    })

    // Encript Password
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    // save User in DB
    await user.save()

    res.status(201).json(user)
}
export const putUsers = async (req = request, res) => {
    const { id } = req.params
    const { _id, password, google, email, ...remainder } = req.body

    if (password) {
        // Encript Password
        const salt = bcryptjs.genSaltSync()
        remainder.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, remainder)

    res.json({
        msg: 'PUT API',
        user,
    })
}

export const deleteUsers = async (req, res) => {
    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, { state: false })

    res.json({
        user,
    })
}

export const patchUsers = (req, res) => {
    res.json({
        msg: 'PATCH API',
    })
}
