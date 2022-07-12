import mongoose from 'mongoose'
const { model, Schema } = mongoose

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'Rol is required'],
    },
})

export default model('Role', RoleSchema)
