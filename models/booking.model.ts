import mongoose,{Document} from  "mongoose";
export interface bookinginter extends Document{
    session: mongoose.Types.ObjectId;
    member:mongoose.Types.ObjectId;
    status:"booked" | "cancelled";

}
const bookigSchema = new mongoose.Schema<bookinginter>({
          session :{
        type:mongoose.Schema.Types.ObjectId,
        ref: "ClassSession",
        required:true,
 },
 member:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
 },
 status:{
    type:String,
    enum:["booked","cancelled"],
    default:"booked",
    required:true,
 },
 },
{
    timestamps:true,
}
);
export const Booking=mongoose.model<bookinginter>("booking",bookigSchema);