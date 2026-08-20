import {Schema,model,Document}from 'mongoose';
export interface IUser extends Document{
    fullName:string;
    email:string;
    password:string;
    role:'Member'|'Trainer';
}
const userSchema=new Schema<IUser>(
    {
        fullName:{
            type:String,
            required:[true,'Full name is required'],
            trim:true
        },
        email:{type:String,
        required:[true,'Email is reqired'],
        unique:true,
        lowercase:true,
        trim:true,
        match:[/^\S+@\S+\.\S+$/,'Please provide a valid email address']
    },
password:{
   type:String,
   required:[true,'Password is required'],
   minlength:[6,'Password must be at least 6 characters']
    },
    role:{
        type:String,
        enum:{
        values:['Member','Trainer'],
        message:'Role must be either Member or Trainer'
        },
        required:[true,'Role is required']
    }
},{timestamps:true}

);
export const User=model<IUser>('User',userSchema);