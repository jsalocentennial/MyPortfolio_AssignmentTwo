import mongoose from 'mongoose';                         //Styled from user page

const qualificationSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Name of qualification is required'
    },
    type: {
        type: String,
        enum: ['Education', 'Certification', 'License'],
        required: 'Type of qualification is required'
    },
    institution: {
        type: String,
        trim: true,
        required: 'Institution is required'
    },
    completionDate: {
        type: Date
    }
    
});

export default mongoose.model("Qualification", qualificationSchema);