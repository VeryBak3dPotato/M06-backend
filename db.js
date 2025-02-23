const mongoose = require('mongoose');
mongoose.connect(
    "mongodb+srv://cbailey138:vW6TfYXn8Lz5Pf3mM0QX@songdb.vj04u.mongodb.net/?retryWrites=true&w=majority&appName=SongDB",
    {useNewUrlParser: true, useUnifiedTopology: true}
);

module.exports = mongoose;