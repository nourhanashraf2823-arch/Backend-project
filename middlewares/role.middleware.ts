import{Request,Response,NextFunction}from'express';
export const authrizeRoles=(allowRoles:Array<'Member'|'Trainer'>)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!req.user){
            return res.status(401).json({message:'User not authenticated. '});

        }
        if(!allowRoles.includes(req.user.role)){
            return res.status(403).json({message:'Access forbidden. Insufficient permissions.' });
        }
        next();
    };
};