import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from '../models/user_models.js';

dotenv.config();                                         //Used to create an admin user 

const seedAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);                      //Connect to DB
        const existingAdmin = await UserModel.findOne({                     //Look for an existing admin user with the specified email
            email: process.env.ADMIN_EMAIL
        });
        if (existingAdmin) {
            console.log(`Account already exists with role: ${existingAdmin.role}`);               //Stop if found
            return;
        }
        const adminUser = new UserModel({                                   //Create new admin
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: 'admin'
        });
        await adminUser.save();
        console.log('Admin user seeded successfully');
    } catch (error) {
        console.error('Error seeding admin user:', error);
    } finally {
        await mongoose.connection.close();
    }
};

seedAdminUser();