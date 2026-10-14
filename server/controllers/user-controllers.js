import UserModel from '../models/user_models.js'   //From October 7th lecture
import generateToken from '../utils/jwt.js'  //From October 14th lecture

// CRUD - Create, Read, Update, Delete

// ES6 arrow function format
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select("name email created updated");   //Don't return password
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select("name email created updated");  //Don't return password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        const savedUser = await newUser.save();

        const token = generateToken(savedUser); // Generate a JWT token for the newly created user (Oct 14th class)

        const safeUser = {                                 //Create a variable to hold the user data without the password
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            created: savedUser.created,
            updated: savedUser.updated
        }
        res.status(201).json( { user: safeUser, token: token } );                   //Call the safe variable and token
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await UserModel.findById(req.params.id)    //Find the user by ID
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }   
        updatedUser.name = req.body.name || updatedUser.name;            //Update the name if provided, otherwise keep the existing name
        updatedUser.email = req.body.email || updatedUser.email;
        updatedUser.password = req.body.password || updatedUser.password;
        updatedUser.updated = Date.now();                                 //Update the updated field to the current date and time
        await updatedUser.save();                                         //Save the updated user to the database
        const safeUser = {                                 //Create a variable to hold the user data without the password
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            created: updatedUser.created,
            updated: updatedUser.updated
        }
        res.status(200).json(safeUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user); // Generate a JWT token 

        res.status(200).json({message: "Login Successful", token}); // Send token 
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
}