import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,   
    },
    password: {
        type: String,      
        required: true,
    },
    position: { 
        type: String,
        required: true,
    },  
    department: {
        type: String,
        required: true,
    },
    dateOfHire: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});     

EmployeeSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }   
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const employee = mongoose.model('Employee', EmployeeSchema);

export default employee;