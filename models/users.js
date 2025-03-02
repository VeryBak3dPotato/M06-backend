const db = require('../db');

const User = db.model("User", {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    status: String
})

module.exports = User;