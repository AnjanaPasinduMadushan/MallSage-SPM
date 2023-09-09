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
    const {Type} = req.body;
  

    try {
      const parkingSlots = await Slot.find({
        isAvailable:true,
        vehicleType:{$eq:Type}
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
    try {
      const {vnumber} =req.body;
      const {id} =req.params;
      const parkingSlots = await Slot.findByIdAndUpdate(id,
        {
        isAvailable:false,
        startTime:Date.now(),
        vehicleNumber:vnumber
      });
        
      if (!parkingSlots) {
        return res.status(404).json({ message: 'Parking slots not found' });
      }
      return res.json(parkingSlots);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  const endOccupide = async (req, res) => {
    try {

      const {id} =req.params;
      const parkingSlots = await Slot.findByIdAndUpdate(id,{
        isAvailable:true,
        endTime:Date.now(),
      });
      const duration = parkingSlots.endTime - parkingSlots.startTime;

      const totalAmount = (duration/1000/60)*2.50;
      if (parkingSlots.length==0) {
        return res.status(404).json({ message: 'Parking slots not found' });
      }
      return res.json({ message: 'Parking slot released', totalAmount, duration });
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