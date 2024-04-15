import mongoose from 'mongoose'
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model('User', userSchema);

export default User;