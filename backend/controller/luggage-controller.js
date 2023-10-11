import RestingLocations from "../model/resting-location-model.js";
import _ from "lodash";
import LuggageDTO from "../dto/LuggageDTO.js";
import Luggage from "../model/luggage-model.js";
import User from "../model/user-model.js";
// Send email using Nodemailer
import nodemailer from "nodemailer";
import Shop from "../model/Shop-model.js";
import axios from "axios";
import cron from 'node-cron';


//Auto generating token
const generateToken = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
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
  console.log(LuggageDTO);
  console.log("LuggageDTO.shop.ShopID", LuggageDTO?.Shop?.ShopID);

  // Declare customerToken here
  let customerToken;

  try {
    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth();
    const currentDateComponent = currentDate.getUTCDate();

    // Check if the customer is an existing one
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
        $gte: new Date(
          Date.UTC(currentYear, currentMonth, currentDateComponent)
        ),
        $lt: new Date(
          Date.UTC(currentYear, currentMonth, currentDateComponent + 1)
        ),
      },
    });

    const existingShop = await Shop.findOne({
      ShopID: LuggageDTO?.Shop?.ShopID,
    });

    if (!existingShop) {
      return res.status(400).json({ message: "Shop not found" });
    }

    let luggage;
    if (existingLuggage) {
      customerToken = existingLuggage.CustomerToken;
      // If an existing luggage is found, reuse its ShopToken and CustomerToken
      luggage = new Luggage({
        luggageID: existingLuggage.luggageID,
        CustomerID: LuggageDTO.CustomerID,
        CustomerEmail: LuggageDTO.CustomerEmail,
        ShopID: LuggageDTO?.Shop?.ShopID,
        ShopName: LuggageDTO?.Shop?.ShopName,
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
      customerToken = await generateUniqueCustomerToken();
      const shopToken = await generateUniqueShopToken();

      luggage = new Luggage({
        luggageID: Math.floor(1000 + Math.random() * 9000),
        CustomerID: LuggageDTO.CustomerID,
        CustomerEmail: LuggageDTO.CustomerEmail,
        ShopID: LuggageDTO?.Shop?.ShopID,
        ShopName: LuggageDTO?.Shop?.ShopName,
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

    async function downloadPdfFromLink(pdfUrl) {
      try {
        const response = await axios.get(pdfUrl, {
          responseType: 'arraybuffer', // This ensures the response is treated as binary data
        });

        return Buffer.from(response.data, 'binary');
      } catch (error) {
        console.error('Error downloading PDF:', error);
        throw error;
      }
    }
    const pdfUrl = LuggageDTO.Bill;
    const pdfBuffer = await downloadPdfFromLink(pdfUrl);

    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mallsage34@gmail.com",
        pass: "jwzaldpwytqqghlj",
      },
      timeout: 30000,
    });

    // console.log("customerToken", customerToken);

    const emailDetails = {
      from: "mallsage34@gmail.com",
      to: LuggageDTO.CustomerEmail,
      subject: `Your items were added by the shop ${existingShop.Name}`,
      text: `Your Customer Token is ${customerToken}. Pls find the billing attached below as well. 
              Pls notice this delivery would only be available for the day.`,
      attachments: [
        {
          filename: "bill.pdf",
          content: pdfBuffer,
        },
      ],
    };

    mailTransporter.sendMail(emailDetails, (err) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent successfully!");
      }
    });

    return res
      .status(201)
      .json({ message: "Luggage is Added", Luggage: luggage });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "Error occurred in adding Luggage", err });
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

//Verify luggage collected by shop by shop Token 
const validateShopToken = async (req, res) => {
  const shopToken = req.params.shopToken;

  try {
    const luggageList = await Luggage.find({ ShopToken: shopToken });

    if (luggageList.length === 0) {
      return res.status(404).json({ message: "No luggage found with the provided ShopToken" });
    }
    console.log("luggageList", luggageList)
    for (const luggage of luggageList) {
      // if (luggage.isComplete) {
      //   return res.status(400).json({ message: "Some luggage entries are already marked as complete" });
      // }

      luggage.isComplete = true;
      luggage.CompletedDate = new Date();

      await luggage.save();
    }

    return res.status(200).json({ message: "All luggage entries marked as complete", luggageList });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in validating the ShopToken" });
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

// Get luggages for the passed date and shopId
async function getLuggagesByShopAndDate(userid, date) {
  try {
    // Use await to get the shop information
    const shop = await Shop.findOne({ userId: userid });
    // Convert the passed date to a Date object
    const searchDate = new Date(date);
    console.log("shop", shop.ShopID)
    // Extract the year, month, and day from the searchDate
    const searchYear = searchDate.getFullYear();
    const searchMonth = searchDate.getMonth();
    const searchDay = searchDate.getDate();
    let shopIdentity = shop.ShopID
    // Calculate the start and end date for the search
    const startDate = new Date(searchYear, searchMonth, searchDay);
    const endDate = new Date(searchYear, searchMonth, searchDay + 1);

    // Find luggages matching the date range
    const luggages = await Luggage.find({
      ShopID: shopIdentity,
      Date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    return luggages;
  } catch (error) {
    console.error('Error fetching luggages:', error);
    throw error;
  }
}


//Get Luggages By Shop Id
async function getLuggagesByShopId(shopId) {
  try {
    // Find all luggages with the specified ShopID
    const luggages = await Luggage.find({ ShopID: shopId });
    return luggages;
  } catch (error) {
    console.error('Error fetching luggages:', error);
    throw error;
  }
}

//Get Luggages By Shop Id
async function getLuggagesByShopIdandUserID(shopId, userId) {
  try {

    const Customer = await User.findById(userId);
    console.log("Customer", Customer.email)

    // Get the current date and format it as YYYY-MM-DD
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];


    // Find all luggages with the specified ShopID
    const luggages = await Luggage.find({
      ShopID: shopId,
      CustomerEmail: Customer.email,
      Date: { $gte: formattedCurrentDate, $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    });
    return luggages;
  } catch (error) {
    console.error('Error fetching luggages:', error);
    throw error;
  }
}

//Get all customer luggages for day
const getallLuggages = async (req, res) => {
  try {
    const email = req.params.email;
    const currentDate = new Date();

    const luggages = await Luggage.find(
      {
        CustomerEmail: email,
        Date: {
          $gte: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          ),
          $lt: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
          ),
        },
      },
      {
        Exit: 1,
        isComplete: 1,
        CollectedDate: 1,
        CompletedDate: 1,
        isSecurityConfirmed: 1,
        isCustomerConfirmed: 1,
        ShopID: 1,
        ShopName: 1,
        _id: 0, // Exclude _id field
      }
    );

    if (!luggages || luggages.length === 0) {
      return res.status(404).json({
        message: "No Luggages found for the specified email and date",
      });
    } else {
      // Create a Set to store unique ShopID and ShopName pairs
      const uniqueShops = new Set();

      // Iterate through the luggages to collect unique ShopID and ShopName
      luggages.forEach((luggage) => {
        uniqueShops.add(
          JSON.stringify({ ShopID: luggage.ShopID, ShopName: luggage.ShopName })
        );
      });

      // Convert the unique ShopID and ShopName pair back to an object
      const uniqueShop = JSON.parse(Array.from(uniqueShops)[0]);

      // Construct the response object
      const responseObject = {
        Exit: luggages[0].Exit,
        isComplete: luggages[0].isComplete,
        CollectedDate: luggages[0].CollectedDate,
        CompletedDate: luggages[0].CompletedDate,
        isSecurityConfirmed: luggages[0].isSecurityConfirmed,
        isCustomerConfirmed: luggages[0].isCustomerConfirmed,
        ShopInfo: uniqueShop,
      };

      res.status(200).json(responseObject);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in getting the Luggages" });
  }
};

//Get total lugagages for all view
const gettotalLuggages = async (req, res) => {
  try {
    const email = req.params.email;
    const currentDate = new Date();

    const luggages = await Luggage.find({
      CustomerEmail: email,
      Date: {
        $gte: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ),
        $lt: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        ),
      },
    });

    if (!luggages || luggages.length === 0) {
      return res.status(404).json({
        message: "No Luggages found for the specified email and date",
      });
    }

    // Calculate the total number of bags
    const totalBags = luggages.reduce(
      (acc, luggage) => acc + parseInt(luggage.BagNo),
      0
    );

    // Create a Set to store unique ShopID and ShopName pairs
    const uniqueShops = new Set();

    // Initialize variables to store total bill and one customer token
    let totalBill = 0;
    let customerToken = null;
    let shopcollected = false;
    let securitycollected = false;
    let customercollected = false;

    // Iterate through the luggages to collect unique ShopID and ShopName, calculate total bill, and get one customer token
    luggages.forEach((luggage) => {
      const { ShopID, ShopName, Bill, CustomerToken, isComplete, isSecurityConfirmed, isCustomerConfirmed } = luggage;
      uniqueShops.add(JSON.stringify({ ShopID, ShopName }));
      shopcollected = isComplete;
      securitycollected = isSecurityConfirmed;
      customercollected = isCustomerConfirmed;
      totalBill += parseFloat(Bill);
      if (!customerToken) {
        customerToken = CustomerToken;
      }
    });

    // Convert the unique ShopID and ShopName pairs back to an array
    const uniqueShopList = Array.from(uniqueShops).map((pair) =>
      JSON.parse(pair)
    );

    res.status(200).json({
      totalBags,
      uniqueShops: uniqueShopList,
      shopcollected,
      securitycollected,
      customercollected,
      totalBill,
      customerToken,
    });
  } catch (err) {
    console.error(err);
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
    console.log("customerEmail", customerEmail);
    const luggageList = await Luggage.find({
      CustomerEmail: customerEmail,
    }).exec();
    res.status(200).json({ luggageList });
  } catch (error) {
    // Handle any potential errors here
    console.error("Error retrieving luggage by customer email:", error);
    console.error(error.stack); // Log the error stack trace
    res.status(500).json({ error: "Internal server error" });
  }
}

// Define the task to run at 11:50 PM every day
cron.schedule('50 23 * * *', async () => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Find all luggages with a Date on or before the current date
    const luggages = await Luggage.find({
      Date: { $lte: currentDate },
      isComplete: false, // Only consider luggages that are not already complete
    });

    // Update isComplete to true for each luggage
    for (const luggage of luggages) {
      luggage.isComplete = true;
      luggage.CompletedDate = new Date();
      await luggage.save();
    }

    console.log('Luggages marked as complete:', luggages.length);
  } catch (error) {
    console.error('Error updating luggages:', error);
  }
});

export {
  addLuggage,
  getOneLuggage,
  getLuggagesByShopAndDate,
  getLuggagesByShopIdandUserID,
  getLuggages,
  gettotalLuggages,
  deleteLuggage,
  getallLuggages,
  validateShopToken,
  getLuggagesByShopId,
  updateLuggage,
  getLuggageByCustomerEmail,
};
