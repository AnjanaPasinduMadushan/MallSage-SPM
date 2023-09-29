import mongoose from "mongoose";
import BaggageEmployee from "../model/baggageemployee-model.js";
import AddBaggageEmployeeDTO from "../dto/AddBaggageEmployeeDTO.js";

const addBaggageEmployee = async (req, res) => {
    const { BaggageEmployeeDTO } = req.body;
  
    try {
      let randomBaggageEmployeeID;
      let isUnique = false;
  
      const existingEmployee = await BaggageEmployee.findOne({
        Email: BaggageEmployeeDTO.Email,
      });
  
      if (existingEmployee) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      // Keep generating random IDs until a unique 4-digit number is found
      while (!isUnique) {
        randomBaggageEmployeeID = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
  
        // Check if the generated ID already exists in the database
        const existingBaggageEmployee = await BaggageEmployee.findOne({
          BaggageEmployeeID: randomBaggageEmployeeID,
        });
  
        if (!existingBaggageEmployee) {
          isUnique = true;
        }
      }
  // console.log("BaggageEmployeeDTO.Name",BaggageEmployeeDTO.Name);
  // console.log(" BaggageEmployeeDTO.Email", BaggageEmployeeDTO.Email)
  // console.log("BaggageEmployeeDTO.Name",BaggageEmployeeDTO.Name)
      // Create a new BaggageEmployee instance using the generated ID and provided DTO data
      const baggageEmployee = new BaggageEmployee({
        BaggageEmployeeID: randomBaggageEmployeeID,
        Name: BaggageEmployeeDTO.Name,
        Email: BaggageEmployeeDTO.Email,
        Address: BaggageEmployeeDTO.Address,
        userId: BaggageEmployeeDTO.userId,
      });
  
      await baggageEmployee.save();
      return res.status(201).json({ message: "Baggage Employee added", BaggageEmployee: baggageEmployee });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: "Error occurred in adding Baggage Employee" });
    }
  };
  
  export { addBaggageEmployee };
