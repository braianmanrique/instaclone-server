const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(user, SECRET_KEY, expiresIn){
    const {id, name, email, username} = user;
    const payload = {
        id,
        name,
        email,
        username
    };

    return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

async function register(input) {
    const newUser = input;
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();
    const {email, username, password} = newUser;
    const foundEmail = await User.findOne({email});
    if(foundEmail) throw new Error("El email ya esta en uso");
    const foundUsername = await User.findOne({username});
    if(foundUsername) throw new Error("nombre de user ya esta en uso");
    const salt = await bcryptjs.genSaltSync(10);
    newUser.password = await bcryptjs.hash(password, salt);

    try {
        const user = new User(newUser);
        user.save();
        return user;
    } catch (error) {
        console.log(error)
    }
}

async function login(input){
    const {email, password} =input;
    const userFound = await User.findOne({email: email.toLowerCase()});

    if(!userFound) throw new Error("Error en el email o contraseña");

    const passwordSuccess = await bcryptjs.compare(password, userFound.password);
    if(!passwordSuccess) throw new Error("Error en el email o contraseña");
   

    return {
        token :  createToken(userFound, process.env.SECRET_KEY, "12h")
    }
}

async function getUser(id, username){
    let user = null;
    if(id) user = await User.findById(id);

    if(username) user = await User.findOne({username});

    if(!user) throw new Error("User not exists")

    return user;
}

async function updateAvatar(file){
    console.log(file);
    return null;
}

module.exports = {
    register,
    login,
    getUser,
    updateAvatar
}