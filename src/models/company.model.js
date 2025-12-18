import mongoose from "mongoose";
const CompanySchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false,
    },
    industry: {
        type: String,
        required: true,
    },
    numberOfEmployees: {
        type: Number,
        // required: true,
    },
}, {
    timestamps: true,
});

const company = mongoose.model("Company", CompanySchema);

export default company;