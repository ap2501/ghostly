import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs; 


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    uniqueLink: {
        type: String,
        unique: true,
    },
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await hash(this.password, 10);
    next();
});

const User = model('User', userSchema);

export default User;
