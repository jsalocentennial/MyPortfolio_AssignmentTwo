import mongoose from 'mongoose';               //Slide 22 - 37 schema and model creation for user model
import bcrypt from 'bcrypt';                   //From video of October 7th class

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    password: {
        type: String,
        required: 'Password is required'
    }
    
});

UserSchema.pre("save", async function(){                          //This comes from October 7th demonstration
    if(this.isModified("password") || this.isNew){
        this.password = await bcrypt.hash(this.password, 10);
    }
}
)

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
} 

export default mongoose.model('User', UserSchema);