const { Router } = require("express");
const jwt = require("jsonwebtoken")
const JWT_SECRET= 'secret'
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db")

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const {username, password} = req.body
    const user = await User.findOne({username: username})
    if(user){
        res.json({Error: "Username already exists"})
    }else{
        const user = new User ({username: username, password: password})
        user.save().then(()=>{
        res.status(200).send("User created successfully")
    })
    }
});

router.post('/signin', async (req, res) => {
    // Implement user signin logic
    const {username, password} = req.body
    // check is valid user
    const user = await User.findOne({username: username})
    if(user && user.password===password){
        try{
            const token = jwt.sign({username: username}, JWT_SECRET)
            res.status(200).json({
                token: token,
                msg: "User signed in successfully"
            })
        }catch(err){
            res.send({Error: err})
        }
    }else{
        res.send("Invalid Credentials")
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const listOfCourses = await Course.find({});
    res.json({
        courses: listOfCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId
    const [bearer, token] = req.headers.authorization.split(' ')
    const username = jwt.verify(token, JWT_SECRET).username
    const user = await User.findOne({username:username})
    const course = await Course.findById(courseId)
    user.courses.push(course)
    await user.save()
    res.send("Course purchased successfully")
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const [bearer, token] = req.headers.authorization.split(' ')
    const username = jwt.verify(token, JWT_SECRET).username
    const user = await User.findOne({username: username})
    await user.populate('courses')
    res.json({purchasedCourses: user.courses})
});

module.exports = router