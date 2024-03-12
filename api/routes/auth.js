const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Register
router.post("/register", async(req,res) =>{
    try{
        console.log(req.body)
        const salt = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        console.log(hashedPass);
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })
        console.log("newUser");
        let user = await newUser.save();
        console.log("User")
        console.log(user);
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json("Wrong Credentials!");
        }
        
        const validate = await bcrypt.compare(req.body.password, user.password);
        if (!validate) {
            return res.status(400).json("Wrong Credentials!");
        }

        const { password, ...others } = user._doc;
        return res.status(200).json(others);
    } catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = router;