import type {Request,Response}from"express";
import mongoose from "mongoose";
import {Booking}from "../models/booking.model"
import ClassSession from "../models/classSession.model";
export const bookSession =async(req:Request,res:Response)=>{
    try{
        const{session}=req.body;
        if(!session){
            return res.status(400).json({
                message:"session ID is required",
            });
        }
        if(!mongoose.Types.ObjectId.isValid(session)){
             return res.status(400).json({
                message:"session ID is Invalid !!",
            });
        }
        const memberID=req.user.id;
        const classSession=await ClassSession.findById(session);
        if(!classSession){
            return res.status(404).json({
                message:" Class session not found ",
            });
        }
        if (classSession.startTime<=new Date()){
            return res.status(400).json({
                message:"This session is expired",
            });
        }
        const duplicatedBooking=await Booking.findOne({
            session,
            member:memberID,
            status:"booked",
        });
        if(duplicatedBooking){
            return res.status(400).json({
                message:"you have already booked this session",
            });
        }
        const bookseats=await Booking.countDocuments({
            session,
            status:"booked",
        });
        if(bookseats>=classSession.capacity){
            return res.status(400).json({
                message:"No enough seats",

            });
        }
        const booking =await Booking.create({
            session,
            member:memberID,
            status:"booked",
        });
        return res.status(201).json({
            message:"Booking done successfully",
            booking,
        });

    }
    catch(error: any){
        return res.status(500).json({
            message:error.message,

        });
    }
};
export const cancelbooking =async (req:Request,res:Response)=>{
    try{
        const bookingId=req.params.id;
        if (Array.isArray(bookingId)){
            return res.status(400).json({
                message:"Invalid booking ID"
            });
        }
        if(!bookingId){
            return res.status(400).json({
                message:"Bookin ID is required",
            });
        }
        if(!mongoose.Types.ObjectId.isValid(bookingId)){
            return res.status(400).json({
                message:"Invalid booking ID",
            });
        }
        const memberID=req.user.id;
        const booking=await Booking.findById(bookingId);
        if(!booking){
            return res.status(404).json({
                message:"NO BOOKING FOUND!",
            });
        }
        if(booking.member.toString()!==memberID){
            return res.status(403).json({
                message:"you can only cancel your own booking",
            });
        }
        if(booking.status === "cancelled"){
            return res.status(400).json({
                message:"booking is already cancelled",
            });
        }
        booking.status="cancelled";
        await booking.save();
        return res.status(200).json({
            message:"booking cancelled successfully",
            booking,
        });


    }
    catch(error:any){
        return res.status(500).json({
            message:error.message

        });
    }
};
export const gettraninerbookings=async(req:Request,res:Response)=>{
    try{
        const trainerID=req.user.id;
        const trainersessions =await ClassSession.find({
            trainer:trainerID,
        }).select("_id title startTime capacity");
        const sessionIDs=trainersessions.map((session)=>session._id);
        const bookings = await Booking.find({
            session:{$in:sessionIDs},
        })
        .populate("member","fullName email")
        .populate("session","title startTime capacity")
        .sort({createdAt:-1});
        return res.status(200).json({
            count:bookings.length,
            bookings,
        });
    }
    catch(error:any){
        return res.status(500).json({
            message:error.message,
        });
    }
};
export const getMyBookings = async (
  req: Request,
  res: Response
) => {
  try {
    const memberID = req.user.id;

    const bookings = await Booking.find({
      member: memberID,
    })
      .populate("session", "title startTime capacity")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
