const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // trim whitespace at the end
        minlength: 3
    },
},
{
    timestamps: true, // automatically create fields for creation and modification time
});

const User = mongoose.model('User', userSchema);

module.exports = User;