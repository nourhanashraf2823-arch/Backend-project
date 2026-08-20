import {Request,Response}from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User }from '../models/user.model';
export const register=async (req:Request,res:Response) => {
try{
    const {fullName,email,password,role}=req.body;
    if(!fullName||!email||!password||!role){
        return res.status(400).json({message:'All fields are requierd.'});
    
    }
    const exitingUser=await User.findOne({email});
    if(exitingUser){
        return res.status(400).json({message:'Email is already registered.'});

    }
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);
    const user=await User.create({
        fullName,
        email,
        password:hashedpassword,
        role
    });
    return res.status(201).json({
        message:'User registered successfully',
        user:{
            id:user.id,
            fullName:user.fullName,
            email:user.email,
            role:user.role
        }
    });}
    catch (error:any){
        return res.status(500).json({message:error.message||'Server error during registration'});
    }


};
export const login=async(req:Request,res:Response)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:'Email and password are required.'});

        }
        const user=await User.findOne({email});
        if(!user||!user.password){
            return res.status(400).json({message:'Invalid email or password.'});

        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({message:'Invalid email or password.'});
        }
        const secret=process.env.JWT_SECRET||'fallback_secret';
        const token=jwt.sign({
            id:user.id,role:user.role },secret,{expiresIn:'7d'}
        );
        return res.status(200).json({
            message:'Login successful',
            token,
            user:{
                id:user.id,
                fullName:user.fullName,
                email:user.email,
                role:user.role
            }
        });
    }catch(error:any){
        return res.status(500).json({message:error.message||'SERver error during login'});
    }
    
};
