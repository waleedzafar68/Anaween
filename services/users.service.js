const pagination = require('../middleware/pagination')
const users = require('../models/users.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

module.exports = {
    getUsers,
    Authenticate,
    addUser,
    updateUser,
    updateUserStatus,
    deleteUser,
    getUserById
}

async function getUsers() {
    return await users.find().sort({ _id: -1 })
}

async function Authenticate(body) {

    const { Name, Password, Role } = body
    const user = await users.findOne({ Name: Name })

    const auth = await bcrypt.compare(Password, user.Password)
        .then((x) => {
            if (x) {
                user.Password = ''
                user.token = generateToken(user._id)
                user.Role = Role
                console.log(user);
                return user
            } else {
                throw error;
            }
        })
    return auth
}

async function addUser(body, file) {
    const Image = file && file.filename;
    const { Name, Email, Phone, Password, Role } = body;
    const user = await users.find({}).sort({ '_id': -1 }).limit(1)
    const hashedPassword = await bcrypt.hash(Password, 10);
    const id = user.length === 0 ? "00001" : ("00000" + String(parseInt(user[0]._id) + 1)).slice(-4);
    return await users.create({ _id: id, Name: Name, Email, Phone, Password: hashedPassword, Image, Role, token: generateToken(id) })
}

async function updateUser(id, body, file) {
    return await (users.findById(id).then(user => {
        if (file) {
            user.Name = body.Name
            user.Email = body.Email
            user.Email = body.Phone
            user.Image = file.filename;
            bcrypt.genSalt(10).then((salts) => {
                bcrypt.hash(req.body.Password, salts)
                    .then((pass) => {
                        user.Password = pass
                        user.token = generateToken(user._id)
                        user.save()
                    })
            })
        } else {

            user.Name = body.Name
            user.Email = body.Email
            user.Email = body.Phone
            bcrypt.genSalt(10).then((salts) => {
                bcrypt.hash(req.body.Password, salts)
                    .then((pass) => {
                        user.Password = pass
                        user.token = generateToken(user._id)
                        user.save()
                    })
            })
        }
    })
    )
}

async function updateUserStatus(id, body) {
    try {
        console.log("Called", id, body);
        const user = await users.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        user.isPro = body.isPro;
        await user.save();
        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update user status');
    }
}

async function deleteUser(id) {
    return await users.findByIdAndDelete(id)
}

async function getUserById(id) {
    console.log(id);
    console.log(users.findById(id));
    return await users.findById(id).select('-Password')
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })
}
