const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel");


const signIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        let user = await UserModel.find({email});
        if(user.length == 0){
            return res.status(200).json({status:"fail", message:"User does not found"});
        }

        let passwordMatched = await bcrypt.compare(password, user[0].password);
        if(!passwordMatched){
            return res.status(200).json({status:"fail", message:"Incorrect password"})
        }

        let payload = {
            name: user[0].name,
            email: user[0].email,
            id: user[0]._id
        }
        let token = jwt.sign(payload, process.env["SECRET_KEY"]);

        return res.status(200).json({status:"success", message:"Login successful", token:token, email:user[0].email});
    } catch (error) {
        console.log(error.message)
        return  res.status(500).json({status:"fail", message:error.message});
    }
}

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await UserModel.find({ email });
        if (user.length != 0) {
            return res.status(200).json({ status: "fail", message: "User already exist" });
        }

        let hashedPassowrd = await bcrypt.hash(password, 10);
        user = await UserModel.create({ name, email, password: hashedPassowrd });
        return res.status(201).json({ status: "success", message: "SignUp successfull" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: "fail", message: error.message });
    }
}

module.exports = { signIn, signUp };