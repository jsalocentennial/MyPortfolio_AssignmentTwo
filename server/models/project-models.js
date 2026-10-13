import mongoose from 'mongoose';                      //From October 7th lecture

const projectSchema = new mongoose.Schema( {
    title: {
        type: String,
        trim: true,
        required: 'Name of project is required'
    },
    completionDate: {
        type: Date,
        required: 'Completion date is required'
    },
    description: {
        type: String,
        trim: true
    }
}
);

export default mongoose.model("Project", projectSchema);