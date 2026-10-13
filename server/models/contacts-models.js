import mongoose from 'mongoose';                         //Styled from user page

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Last name is required'
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: 'Phone number is required'
    },
    message: {
        type: String,
        trim: true
    }
});

export default mongoose.model("Contact", contactSchema);