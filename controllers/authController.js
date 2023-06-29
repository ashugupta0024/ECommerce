import { hashPassword } from "../helpers/authHelper.js";
import usermodel from "../models/usermodel.js";

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
            })
        }
        //register User
        const hashedPassword = await hashPassword(password);
        //save
        const user = new usermodel({name,email,phone,address,password:hashedPassword}).save();
        
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
        })
    }
};

// export default registerController