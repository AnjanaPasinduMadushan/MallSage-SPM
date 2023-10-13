import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const slotSchema = new Schema({
    slotNumber: {
        type: Number,
        required: true,
      },
      floor: {
        type: Number,
        required: true
      },
      vehicleType: {
        type: String,
        enum: ['car', 'bike'],
        required: true,
      },
      isAvailable: {
        type: Boolean,
        default:true,
        required: true,
      },
      startTime: { 
        type: Date,       
      },
      vehicleNumber:{
        type: String,
      },
      endTime:{
        type: Date,
      }
     

  })
  
  const Slot = mongoose.model("Slot", slotSchema);
  
  export default Slot;