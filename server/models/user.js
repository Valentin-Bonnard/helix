import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    salt: {
        type: String
    }
},
    {
        versionKey: false
    }

);


export default mongoose.model('User', UserSchema);