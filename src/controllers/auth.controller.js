import User from '../modules/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';

//Register
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    
    try{
        const passwordHash = await bcrypt.hash(password, 10) //encripta password

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        })

       const userSaved = await newUser.save()
        //estos son los datos que visualizas al crear un nuevo usuario
        const token = await createAccessToken({_id: userSaved._id})
        res.cookie("token", token)          
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        console.log('❌',error)
        res.status(500).json({message: 'Algo salió mal, intente más tarde'})
    }
    
    
}

//Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        //comprobar que el usuario existe
        const userLogged = await User.findOne({ email })
        if (!userLogged) return res.status(400).json({message: 'Usuario no encontrado'})

        const isMatch = await bcrypt.compare(password, userLogged.password) 
        if (!isMatch) return res.status(400).json({message: 'La contraseña es incorrecta'})

        const token = await createAccessToken({_id: userLogged._id})
       
        res.cookie("token", token)          
        res.json({
            id: userLogged._id,
            username: userLogged.username,
            email: userLogged.email,
            createdAt: userLogged.createdAt,
            updatedAt: userLogged.updatedAt
        });
    } catch (error) {
        console.log('❌',error)
        res.status(500).json({message: 'Algo salió mal, intente más tarde'})
    }   
    
}

export const logout = async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  });
  return res.sendStatus(200);
}

export const verifyToken = async (req, res) => {
   const userFound = await User.findById(req.user._id)

   if(!userFound) return res.status(403).json({message: 'Usuario no encontrado'})

   return res.json({
     id: userFound._id,
     username: userFound.username,
     email: userFound.email,
     createdAt: userFound.createdAt,
     updatedAt: userFound.updatedAt,
   })

   res.send('Verificando Token') 
}