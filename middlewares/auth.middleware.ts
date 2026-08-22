import{Request,Response,NextFunction}from 'express';
import jwt from 'jsonwebtoken';
 export interface DecodedToken{
    id:string;
    role:'Member'|'Trainer';
}

declare global {
    namespace Express {
        interface Request {
            user: DecodedToken;
        }
    }
}

export const authenticate=(req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'Access denied. No token provided.'});

    }
    const token=authHeader.split(' ')[1];
    try{
       const secret = process.env.JWT_SECRET;

if (!secret) {
  return res.status(500).json({
    message: "JWT_SECRET is not configured",
  });
}
        const decoded=jwt.verify(token,secret) as DecodedToken;
        req.user={
            id:decoded.id,
            role:decoded.role
        };
        next();
    }catch(error){
        return res.status(401).json({message:'Invalid or expired token.'});
    
    }
};