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
        enum: ['car', 'bike','van'],
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
      endTime:{
        type: Date,
      },
      vehicleNumber:{
        type: String,
      }

  })
  
  const Slot = mongoose.model("Slot", slotSchema);
  
  export default Slot;