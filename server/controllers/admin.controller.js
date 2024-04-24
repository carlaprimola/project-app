import User from "../modules/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Hubo un error al obtener los usuarios', error});
    }
}
