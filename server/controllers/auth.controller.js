import User from '../modules/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

//Register
export const register = async (req, res) => {
    const { username, email, password, tipoRol } = req.body;

    // Validar el valor de tipoRol solo si se proporciona en la solicitud
    if (tipoRol && tipoRol !== "admin" && tipoRol !== "user") {
        return res.status(400).json({ message: "Ese rol no existe" });
    }
    
    try {
        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(400).json({ message: ["El email ya existe"] });
        }

        const passwordHash = await bcrypt.hash(password, 10); //encripta password

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            tipoRol: tipoRol || "user", // Utiliza el valor proporcionado o el valor predeterminado "user"
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ _id: userSaved._id });
        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
            tipoRol: userSaved.tipoRol,
        });
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Algo salió mal, intente más tarde' });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Comprobar que el usuario existe
        const userLogged = await User.findOne({ email })
        if (!userLogged) return res.status(400).json({ message: 'Usuario no encontrado' })

        const isMatch = await bcrypt.compare(password, userLogged.password) 
        if (!isMatch) return res.status(400).json({ message: 'La contraseña es incorrecta' })

        const token = await createAccessToken({ _id: userLogged._id })

        // Verificar el rol del usuario
        if (userLogged.tipoRol === 'user') {
            // Usuario con rol de usuario normal
            // Realizar acciones específicas para el rol de user
                res.json({
                id: userLogged._id,
                username: userLogged.username,
                email: userLogged.email,
                role: userLogged.tipoRol,
                isAdmin: false,               
                
            });
        } else {
            // Usuario con rol de admin
            // Realizar acciones específicas para el rol de admin
            res.json({
                id: userLogged._id,
                username: userLogged.username,
                email: userLogged.email,
                role: userLogged.tipoRol,
                isAdmin: true,
                
            });
        }
    } catch (error) {
        console.log('❌', error)
        res.status(500).json({ message: 'Algo salió mal, intente más tarde' })
    }
}

//Logout
export const logout = async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  });
  return res.sendStatus(200);
}

export const profile = async (req, res) => {
   const userFound = await User.findById(req.user._id)

   if(!userFound) return res.status(403).json({message: 'Usuario no encontrado'})

   return res.json({
     id: userFound._id,
     username: userFound.username,
     email: userFound.email,
     createdAt: userFound.createdAt,
     updatedAt: userFound.updatedAt,
   })
}
   //no dejar continuar tras el login si no hay token
   export const verifyToken = async (req, res) => {
    const {token} =  req.cookies
    if (!token) return res.status(401).json({message: "No se ha encontrado ningún token"})

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json ({message: "No autorizado"}) 

        const userFound = await User.findById(user._id)
        if(!userFound) return res.status(403).json({message: 'Usuario no encontrado'})

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    })
}

// Controlador para mostrar todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};


// Controlador para actualizar un usuario
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updateFields = req.body; // Campos a actualizar

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

// Controlador para eliminar un usuario
// Controlador para eliminar un usuario
export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Devolver el mensaje "Usuario eliminado correctamente" en lugar de los datos del usuario
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};


