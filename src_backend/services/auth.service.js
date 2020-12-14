const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function formatResponse(user){
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY);
      
    return{
        user: {
            isAdmin: user.isAdmin,
            email: user.email
        },
        tokenExpires: 86400,
        token
    };
}

const userService = {
    
    signup: async (email, senha, cpf, nome, data_nascimento, telefone, endereco, isAdmin) => {
        // vendo se já existe um usuário com este email cadastrado:
        const user = await User.findOne({ email : email });
        // se o usuário já existe, não devemos criar uma nova conta:
        if(user){
            return null;
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(senha, salt);
        const createdUser = await User.create({ 
            email,
            senha: hash,
            cpf,
            nome,
            data_nascimento,
            telefone, 
            endereco,
            isAdmin 
        });
        return formatResponse(createdUser);
    },

    signin: async(email, senha) => {
        const user = await User.findOne({ email : email });
        if (!user){
            return null;
        }
        // caso o usuário digite uma senha incorreto, retorna-se null:
        if(!bcrypt.compareSync(senha, user.senha)){
            console.log("senhas diferentes")
            return null;
        }
        return formatResponse(user);
    },

    find: async() => {
        const users = await User.find({});
        return users;
    },

    updateById: async(edited) => {
        const user = await User.findOne({ _id: edited._id})
        if (user.senha === edited.senha) {
            delete edited.senha
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(edited.senha, salt)
            edited.senha = hash
        }
        const editedUser = await User.findOneAndUpdate({ _id: edited._id}, edited, {new: true})
        return editedUser;
    },

    deleteById: async(id) => {
          
        const user = await User.findOneAndDelete({ _id: id}); 
          
        return user;
    }

}

module.exports = userService;