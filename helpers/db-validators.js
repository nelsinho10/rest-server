import Role from '../models/role.js'
import User from '../models/User.js'

export const rolIsValid = async (rol = '') => {
    const existRol = await Role.findOne({ rol })
    if (!existRol) throw new Error(`Is rol ${rol} not registered in DB`)
}

export const emailExists = async (email = '') => {
    // Validate User if exist
    const existsEmail = await User.findOne({ email })

    if (existsEmail) {
        throw new Error('The email is already registered')
    }
}

export const existUserById = async (id) => {

    const existsUser= await User.findById(id)

    if(!existsUser){
        throw new Error('The user is not exists in DB')
    }


}