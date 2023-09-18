import RestingLocations from "../model/resting-location-model.js";
import _ from "lodash";
import LuggageDTO from "../dto/LuggageDTO.js";
import Luggage from "../model/luggage-model.js";
import User from "../model/user-model.js";


//Auto generating token 
const generateToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < 4; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

const generateUniqueCustomerToken = async () => {
  let isUnique = false;
  let token;
  
  while (!isUnique) {
    token = generateToken();
    
    // Check if the generated token already exists in the database
    const existingLuggage = await Luggage.findOne({
      CustomerToken: token,
    });

    if (!existingLuggage) {
      isUnique = true;
    }
  }
  
  return token;
};

const generateUniqueShopToken = async () => {
  let isUnique = false;
  let token;
  
  while (!isUnique) {
    token = generateToken();
    
    // Check if the generated token already exists in the database
    const existingLuggage = await Luggage.findOne({
      ShopToken: token,
    });

    if (!existingLuggage) {
      isUnique = true;
    }
  }
  
  return token;
};

const addLuggage = async (req, res) => {
  const { LuggageDTO } = req.body;

  console.log(req.body);

  try {
    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth();
    const currentDateComponent = currentDate.getUTCDate();

    //Check if the customer is an exsisting one
    const existingUser = await User.findOne({
      email: LuggageDTO.CustomerEmail,
      role: "customer",
    });

    if (!existingUser) {
      return res.status(400).json({ message: "Customer not found" });
    }
   
    const existingLuggage = await Luggage.findOne({
      CustomerEmail: LuggageDTO.CustomerEmail,
      Date: {
        $gte: new Date(Date.UTC(currentYear, currentMonth, currentDateComponent)),
        $lt: new Date(Date.UTC(currentYear, currentMonth, currentDateComponent + 1)),
      },
    });


    let luggage;
    if (existingLuggage) {
      // If an existing luggage is found, reuse its ShopToken and CustomerToken
      luggage = new Luggage({
        luggageID: existingLuggage.luggageID,
        CustomerID: LuggageDTO.CustomerID,
        CustomerEmail: LuggageDTO.CustomerEmail,
        ShopID: LuggageDTO.ShopID,
        BagNo: LuggageDTO.BagNo,
        Bill: LuggageDTO.Bill,
        Date: new Date(),
        TimeDuration: LuggageDTO.TimeDuration,
        SecurityCheckPoint: LuggageDTO.SecurityCheckPoint,
        SecurityID: LuggageDTO.SecurityID,
        SecurityAdminID: LuggageDTO.SecurityAdminID,
        isComplete: LuggageDTO.isComplete,
        isSecurityConfirmed: LuggageDTO.isSecurityConfirmed,
        isCustomerConfirmed: LuggageDTO.isCustomerConfirmed,
        ShopToken: existingLuggage.ShopToken,
        CustomerToken: existingLuggage.CustomerToken,
      });
    } else {
      // Generate unique CustomerToken and ShopToken
      const customerToken = await generateUniqueCustomerToken();
      const shopToken = await generateUniqueShopToken();

      luggage = new Luggage({
        luggageID: Math.floor(1000 + Math.random() * 9000),
        CustomerID: LuggageDTO.CustomerID,
        CustomerEmail: LuggageDTO.CustomerEmail,
        ShopID: LuggageDTO.ShopID,
        BagNo: LuggageDTO.BagNo,
        Bill: LuggageDTO.Bill,
        Date: new Date(),
        TimeDuration: LuggageDTO.TimeDuration,
        SecurityCheckPoint: LuggageDTO.SecurityCheckPoint,
        SecurityID: LuggageDTO.SecurityID,
        SecurityAdminID: LuggageDTO.SecurityAdminID,
        isComplete: LuggageDTO.isComplete,
        isSecurityConfirmed: LuggageDTO.isSecurityConfirmed,
        isCustomerConfirmed: LuggageDTO.isCustomerConfirmed,
        ShopToken: shopToken,
        CustomerToken: customerToken,
      });
    }

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

async function getLuggageByCustomerEmail(req, res) {
  try {
    const customerEmail = req.params.email;
    console.log("customerEmail",customerEmail)
    const luggageList = await Luggage.find({ CustomerEmail: customerEmail }).exec();
    res.status(200).json({ luggageList });
  } catch (error) {
    // Handle any potential errors here
    console.error('Error retrieving luggage by customer email:', error);
    console.error(error.stack); // Log the error stack trace
    res.status(500).json({ error: 'Internal server error' });
  }
}



export { addLuggage, getOneLuggage, getLuggages, deleteLuggage, updateLuggage, getLuggageByCustomerEmail };
