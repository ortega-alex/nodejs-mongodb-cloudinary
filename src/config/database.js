const mongoose = require('mongoose');

mongoose.connect(process.env.MOMGODB_URI, {
    useNewUrlParser: true
}).then(() => console.log('db is connected'))
    .catch((err) => console.log('err', err.toString()));
