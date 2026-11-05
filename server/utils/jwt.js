import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,  //Include the role in the JWT payload
        },
        process.env.JWT_SECRET,  
        { expiresIn: '30d', }
    );    
};

export default generateToken;