import mongoose from 'mongoose';                         //Styled from user page

const qualificationSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Name of qualification is required'
    },
    completionDate: {
        type: Date,
        required: 'Completion date is required'
    },
    description: {
        type: String,
        trim: true
    }
});

export default mongoose.model("Qualification", qualificationSchema);