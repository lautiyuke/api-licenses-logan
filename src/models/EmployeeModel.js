import mongoose from "mongoose";

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

var employee = new mongoose.model('Employee', schema);

module.exports = employee;