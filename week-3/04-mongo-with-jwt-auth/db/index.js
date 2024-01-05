const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://thrills:qwerty123@100x-dev-course.2377cod.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("connected")
})


// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: {
        type: String, 
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    imageLink: {
        type: String
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}