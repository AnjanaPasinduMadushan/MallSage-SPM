import Slot from "../model/slot-model.js";

const createParkingSlot = async (req, res) => {
    try {
      const { slotNumber, vehicleType , floor } = req.body;
      const existingSlot = await Slot.findOne({ slotNumber });  
      if (existingSlot) {
        return res.status(400).json({ message: 'Parking slot with the same number already exists.' });
      }        
      const newSlot = new Slot({
        slotNumber,
        floor,
        vehicleType,
      });  
      await newSlot.save();  
      res.json({ message: 'Parking slot created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const getParkingSlotById = async (req, res) => {
    try {
      const { id } = req.params;        
      const parkingSlot = await Slot.findById(id);
  
      if (!parkingSlot) {
        return res.status(404).json({ message: 'Parking slot not found' });
      }
  
      res.json(parkingSlot);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  const getAllParkingSlots = async (req, res) => {
    try {
      
      const parkingSlots = await Slot.find();
  
      
      if (parkingSlots.length==0) {
        return res.status(404).json({ message: 'Parking slots not found' });
      }
      res.json(parkingSlots);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  const deleteParkingSlot = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the parking slot exists
      const parkingSlot = await Slot.findByIdAndRemove(id);
  
      if (!parkingSlot) {
        return res.status(404).json({ message: 'Parking slot not found' });
      }
  
       res.json({ message: 'Parking slot deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getAvailableSlots = async (req, res) => {
    const { type } = req.params;
  
    try {
      const parkingSlots = await Slot.find({
        isAvailable:true,
        vehicleType:type
      });
        
      if (parkingSlots.length==0) {
        return res.status(404).json({ message: 'Parking slots not found' });
      }
      return res.json(parkingSlots);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  const slotOccupide = async (req, res) => {
   
      const id =req.params.id;
      const {vehicleNumber,isAvailable,startTime} =req.body;
      let slot;
      try{
      slot = await Slot.findByIdAndUpdate(id,
        {
        isAvailable:false,
        startTime:Date.now()       
      ,vehicleNumber},{new:true});
        slot = await slot.save();
      } catch (error) {
        console.error(error);
      }
      if (!slot ) {
        return res.status(404).json({ message: 'Parking slots not found' });
      }
      console.log(slot.vehicleNumber);
      return res.status(200).json({slot});    
    }
      
  

  const endOccupide = async (req, res) => {
    try {

      const {id} =req.params;
      const parkingSlots = await Slot.findByIdAndUpdate(id,{
        isAvailable:true,
        endTime:new Date(),
      });
      const end = new Date();
      const start = parkingSlots.startTime;
      const duration =((end-start)/1000);
      
      const totalAmount = (duration/60)*2.50;
      if (parkingSlots.length==0) {
        return res.status(404).json({ message: 'Parking slots not found' });
      }
      return res.json({ message: 'Parking slot released', totalAmount, duration ,Slot:parkingSlots});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }


  
  export{createParkingSlot}
  export{getParkingSlotById}
  export{getAllParkingSlots}
  export{deleteParkingSlot}
  export{getAvailableSlots}
  export{endOccupide}
  export{slotOccupide}