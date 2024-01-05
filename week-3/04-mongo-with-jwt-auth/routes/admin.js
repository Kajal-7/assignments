const { Router } = require("express");
const jwt = require("jsonwebtoken")
const JWT_SECRET = 'secret'
const {adminMiddleware, validateUsername} = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require("../db")
// Admin Routes
router.post('/signup', validateUsername, async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    const admin = new Admin ({username: username, password: password})
    admin.save().then(()=>{
        res.status(200).send("Admin created successfully")
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signin logic
    const {username, password} = req.body
    const admin = await Admin.findOne({username: username})
    if(admin && admin.password===password){
        const token = jwt.sign({username: username}, JWT_SECRET)
        res.status(200).json({token: token, msg: "Successfully Logged in"})
    }else{
        res.status(400).send("Wrong Username/ Password")
    }

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const {title, description, price, imageLink} = req.body;
    const course = new Course({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    })
    course.save().then(()=>{
        res.status(200).json({
            msg: "Course added successfully"
        })
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const listOfCourses = await Course.find({});
    res.json({
        courses: listOfCourses
    })
});

module.exports = router;