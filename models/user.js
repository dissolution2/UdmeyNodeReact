const mongoose = require('mongoose');
//const Schema = mongoose.Schema; // next line are the same
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users',userSchema);