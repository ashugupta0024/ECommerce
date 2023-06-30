import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import usermodel from "../models/usermodel.js";
import JWT from "jsonwebtoken";
// import usermodel from "../models/userModel";
export const registerController = async(req,res) => {
    try{
        const{name,email,password,phone,address} = req.body
        //validation
        if(!name){
            return res.send({error: 'Name is Required'});
        }
        if(!password){
            return res.send({error: 'Password is Required'});
        }
        if(!email){
            return res.send({error: 'Email is Required'});
        }
        if(!phone){
            return res.send({error: 'Phone is Required'});
        }
        if(!address){
            return res.send({error: 'Address is Required'});
        }
        //check user
        const existingUser = await usermodel.findOne({email})
        //existing User
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: 'Already existing user, Please login'
            });
        }
        //register User
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new usermodel({name,email,phone,address,password:hashedPassword}).save();
        
        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        });
    }
};

// POST LOGIN
export const loginController = async(req,res) => {
    try{
        const{email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            });
        }
        //check user
        const user = await usermodel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            });
        }
        const match = await comparePassword(password,user.password) //Hamare password ko user ke hashed password se compare karare uss function se jo humne controller mei banaya hai
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            });
        }
        //token
        const token = JWT.sign({_id:user._id},process.env.JWT_SECRET, {expiresIn:"7d"});
        res.status(200).send({
            success: true,
            message: 'Login Sucessfuly',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone
            },
            token,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
};

//test Controller
export const testController = (req,res)  => {
    try{
        res.send("Protected Routes");
    }
    catch(error){
        console.log(error);
        res.send({error});
    }
};