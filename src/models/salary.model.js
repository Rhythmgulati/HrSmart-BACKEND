import mongoose from "mongoose";

const SalarySchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    duration: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

const Salary = mongoose.model("Salary", SalarySchema);

export default Salary;