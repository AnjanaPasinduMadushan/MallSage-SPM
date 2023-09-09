import RestingLocations from "../model/resting-location-model.js";
import _ from "lodash";
import LuggageDTO from "../dto/LuggageDTO.js";
import Luggage from "../model/luggage-model.js";
import User from "../model/user-model.js";

const addLuggage = async (req, res) => {
  const { LuggageDTO } = req.body;

  console.log(req.body);

  try {
    let randomLuggageID;
    let isUnique = false;

    // Keep generating random IDs until a unique one is found
    while (!isUnique) {
      randomLuggageID = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number

      // Check if the generated ID already exists in the database
      const existingLuggage = await Luggage.findOne({
        luggageID: randomLuggageID,
      });

      if (!existingLuggage) {
        isUnique = true;
      }
    }

    console.log("luggageDTO", LuggageDTO);

     // Check if the CustomerEmail exists in the User collection
     const userWithEmail = await User.findOne({
      email: LuggageDTO.CustomerEmail,
    });

    if (!userWithEmail) {
      return res.status(400).json({ message: "CustomerEmail does not exist" });
    }

    const luggage = new Luggage({
      luggageID: randomLuggageID,
      CustomerID: LuggageDTO.CustomerID,
      CustomerEmail: LuggageDTO.CustomerEmail,
      ShopID: LuggageDTO.ShopID,
      BagNo: LuggageDTO.BagNo,
      TimeDuration: LuggageDTO.TimeDuration,
      SecurityCheckPoint: LuggageDTO.SecurityCheckPoint,
      SecurityID: LuggageDTO.SecurityID,
      SecurityAdminID: LuggageDTO.SecurityAdminID,
      isComplete: LuggageDTO.isComplete,
      isSecurityConfirmed: LuggageDTO.isSecurityConfirmed,
      isCustomerConfirmed: LuggageDTO.isCustomerConfirmed,
    });

    await luggage.save();
    return res
      .status(201)
      .json({ message: "Luggage is Added", Luggage: luggage });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "Error occurred in adding Luggage" });
  }
};

const getOneLuggage = async (req, res) => {
  const luggageId = req.params.luggageId;

  try {
    const luggage = await Luggage.findById(luggageId);

    if (!luggage) {
      return res.status(404).json({ message: "Luggage is not found" });
    } else {
      res.status(200).json({ luggage });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in getting the Luggage" });
  }
};

const getLuggages = async (req, res) => {
  try {
    const luggages = await Luggage.find();

    if (!luggages) {
      return res.status(404).json({ message: "No Luggages added" });
    } else {
      res.status(200).json({ luggages });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in getting the Luggages" });
  }
};

const deleteLuggage = async (req, res, next) => {
  const id = req.params.id;
  let luggage;

  try {
    luggage = await Luggage.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in deleting the Luggage" });
  }

  if (!luggage) {
    return res
      .status(400)
      .json({ message: "Luggage is already deleted or not added" });
  }

  return res.status(200).json({ message: "Luggage deleted successfully" });
};

const updateLuggage = async (req, res, next) => {
  const id = req.params.id;

  let luggage;

  try {
    luggage = await Luggage.findByIdAndUpdate(id, req.body, { new: true });
  } catch (err) {
    console.log(err);
  }

  if (!luggage) {
    return res.status(404).json({
      message: "Unable to update Luggage details or luggage is not added",
    });
  }

  return res.status(200).json({ message: "Luggage Updated successfully" });
};

export { addLuggage, getOneLuggage, getLuggages, deleteLuggage, updateLuggage };
