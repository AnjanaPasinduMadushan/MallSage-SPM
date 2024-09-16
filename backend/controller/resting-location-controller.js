import RestingLocations from "../model/resting-location-model.js";
import _ from 'lodash';
import nodemailer from "nodemailer";

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mallsage34@gmail.com",
    pass: "jwzaldpwytqqghlj",
  },
});

const addLocation = async (req, res) => {
  const { locationName, locationPlaced, locationFeatures, availability } = req.body;

  console.log(req.body);
  console.log(availability)
  try {
    if (!_.isNumber(parseInt(availability))) {
      return res.status(400).json({ message: "Invalid value for availability" });
    }
    const location = new RestingLocations({
      locationName,
      locationPlaced,
      locationFeatures,
      availability
    })
    await location.save();
    return res.status(201).json({ message: "Location is Added successfully", RestingLocations: location })
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Error in saving admin in DB" });
  }
}

const getOneLocation = async (req, res) => {

  const locationId = req.params.locationId;

  try {
    const location = await RestingLocations.findById(locationId);

    if (!location) {
      return res.status(404).json({ message: "Location is not found" })
    }
    else {
      res.status(200).json({ location })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in getting the Location" })
  }
}

const getLocations = async (req, res) => {

  try {

    const locations = await RestingLocations.find();

    if (!locations) {
      return res.status(404).json({ message: "Locations are not added" })
    }
    else {
      res.status(200).json({ locations })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in getting the Locations" })
  }
}

const deleteLocation = async (req, res, next) => {

  const id = req.params.id;
  let location;

  try {
    location = await RestingLocations.findByIdAndDelete(id)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in deleting the Location" })
  }

  if (!location) {
    return res.status(400).json({ message: "Location is already deleted or not added" })
  }

  return res.status(200).json({ message: "Location deleted successfully" })
}

const updateLocation = async (req, res, next) => {

  const id = req.params.id;
  const no = req.body.availability;

  let location;
  console.log(no)
  try {
    if (!_.isNumber(parseInt(no))) {
      return res.status(400).json({ message: "Invalid value for availability" });
    }
    location = await RestingLocations.findByIdAndUpdate(id, req.body, { new: true })
  } catch (err) {
    console.log(err)
  }

  if (!location) {
    return res.status(404).json({ message: "Unable to update Location details or location is not added" })
  }

  return res.status(200).json({ message: "Location Updated successfully" })

}

const addNoReserved = async (req, res) => {

  const id = req.params.id;
  const { Reserved, userRole, email, locationName } = req.body;
  console.log(email)
  let isGetsIn;
  let location;

  try {
    location = await RestingLocations.findById(id);

    if (!location) {
      return res.status(404).json({ message: "Unable to update Location details or location is not added" })
    }

    // Validate 'Reserved' and 'no' property
    if (!_.isArray(Reserved) && Reserved.length === 0) {
      return res.status(400).json({ message: "Invalid 'Reserved' data" });
    }

    const firstIndex = Reserved[0];
    const userId = firstIndex.userId;

    if (!_.isNumber(firstIndex.no)) {
      return res.status(400).json({ message: "Invalid value" });
    }

    if (userRole === "customer") {
      try {
        const isIdAlreadyThere = location.Reserved.find(reservations => reservations.userId.toString() === userId);
        if (isIdAlreadyThere) {
          return res.status(400).json({ message: "You have already reserved a seat in this location" })
        }
      } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Error in finding the userID" })
      }
    } else {
      isGetsIn = true;
    }

    const uniqueNo = Math.floor((1000 + Math.random() * 9000));

    const newReservation = location.Reserved.create({
      userId: userId,
      no: firstIndex.no,
      qrCode: uniqueNo,
      isGetsIn: isGetsIn
    });

    location.currentNoReserved += firstIndex.no;
    if (location.currentNoReserved > location.availability) {
      return res.status(403).json({ message: "Currently, isnt have enough spaces for all of you!!!" })
    }

    location.count += 1;
    const currentDateTime = new Date();
    const expirationTime = new Date(currentDateTime.getTime() + 20 * 60 * 1000); // Add 20 minutes
    if (userRole === "customer") {
      const emailDetails = {
        from: "mallsage34@gmail.com",
        to: email, // Use the customer's email
        subject: "Holding Space in a Resting Locations",
        html: `<p>Dear Customer,</p>
        <p>Thank you for choosing ${locationName}! Your reservation is confirmed.</p>
        
        <p><strong>Reservation Details:</strong></p>
        <ul>
          <li>Location: ${locationName}</li>
          <li>Reserved Number: <strong>${uniqueNo}</strong></li>
          <li>Date and Time: ${currentDateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</li>
          <li>Expiration Time: ${expirationTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</li>
        </ul>
    
        <p>Please make sure to show this reservation number (<strong>${uniqueNo}</strong>) when entering ${locationName}. Our team is excited to welcome you!</p>
        <p><em>Note: Your reservation will expire at ${expirationTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}. Please ensure to use it before the expiration time.</em></p>
        <p><em>This is a auto-genarated message. Do not reply to this email.</em></p>
        <br>
        <p>Mall-Sage</p>
        `,
      };

      mailTransporter.sendMail(emailDetails, (err) => {
        if (err) {
          console.error("Error sending email:", err);
        } else {
          console.log("Email sent successfully!");
        }
      });
    }

    location.Reserved.push(newReservation);
    try {
      await location.save();
    } catch (saveError) {
      console.error("Error saving location:", saveError);
      return res.status(500).json({ message: "Error saving location" });
    }

    if (userRole === "customer") {
      return res.status(200).json({ message: "Successfully added to the Location and we've just sent you an email with the code.", uniqueNo });
    }

    return res.status(200).json({ message: "Successfully added to the Location!!!", uniqueNo });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//For update the getsIn function for reservations done by the admin
const updateGetsIn = async (req, res) => {

  const id = req.params.id;
  const code = req.body.qrCode;
  try {
    const location = await RestingLocations.findById(id);
    console.log(location);
    const indexToChange = location.Reserved.findIndex((reservation) =>
      reservation.qrCode === code
    )
    console.log(indexToChange);
    if (indexToChange === -1) {
      return res.status(404).json({ message: "Invalid Status code!!!" });
    } else if (!(location.Reserved[indexToChange].isGetsIn)) {
      console.log(location.Reserved[indexToChange].isGetsIn)
      location.Reserved[indexToChange].isGetsIn = true;
    } else {
      return res.status(400).json({ message: "Customer is already in the Location." });
    }

    await location.save();
    return res.status(200).json({ message: "Successfully Entered" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

}

const decreaseNoAndDeleteReserved = async (req, res) => {

  const id = req.params.id;
  const body = req.body;
  const qrCode = body.qrCode;
  let location;

  try {
    location = await RestingLocations.findById(id);

    if (!location) {
      return res.status(404).json({ message: "Unable to update Location details or location is not added" })
    }

    const indexToRemove = location.Reserved.findIndex((reservation) =>
      reservation.qrCode === qrCode
    );

    if (indexToRemove === -1) {
      return res.status(404).json({ message: "Code is not found in reservations" });
    }

    console.log('indexToRemove ', indexToRemove)

    if (body && body.no && _.isNumber(body.no) && !_.isNaN(body.no) && body.no != 0) {
      location.Reserved[indexToRemove].no -= body.no;
      location.currentNoReserved -= body.no;
    } else {
      location.currentNoReserved -= location.Reserved[indexToRemove].no;


      const removedReservation = location.Reserved[indexToRemove];
      console.log(removedReservation)

      if (removedReservation) {
        const entryTime = removedReservation.getsInTime;
        const exitTime = new Date();
        const stayingTimeMilliseconds = exitTime - entryTime;
        const stayingTimeMinutes = stayingTimeMilliseconds / (1000 * 60);

        location.avgTime = (location.avgTime * location.count + stayingTimeMinutes) / (location.count + 1);
        location.count += 1;
      }
      location.Reserved.splice(indexToRemove, 1);
    }
    await location.save();

    if (body.no === null) {
      return res.status(200).json({ message: `Successfully removed the user` })
    }

    return res.status(200).json({ message: `Location availability is increased by ${body.no}` })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

}

const DeleteTimeExceededReservations = async (req, res) => {

  try {
    const currentTime = new Date();
    const timeThreshold = new Date(currentTime - 20 * 60 * 1000);

    const exceededReservations = await RestingLocations.find({
      'Reserved.getsInTime': { $lt: timeThreshold },
      'Reserved.isGetsIn': false
    });

    if (exceededReservations.length === 0) {
      console.log('No exceeded reservations found');
      // return res.status(200).json({ message: "No exceeded reservations found" });
    }
    console.log('exceededReservations', exceededReservations)
    for (const doc of exceededReservations) {
      const sumOfRemoved = doc.Reserved.filter((reservation) => reservation.getsInTime <= timeThreshold && !reservation.isGetsIn)
        .reduce((sum, obj) => sum + obj.no, 0);
      doc.currentNoReserved += sumOfRemoved;
      doc.Reserved = doc.Reserved.filter((reservation) => reservation.getsInTime > timeThreshold || reservation.isGetsIn)
      await doc.save();
    }

  } catch (error) {
    console.log('something is wrong when deleting Reservations', error)
    return res.status(500).json({ message: "Internal server error" });
  }

}

setInterval(DeleteTimeExceededReservations, 20 * 60 * 1000);

export {
  addLocation,
  getOneLocation,
  getLocations,
  deleteLocation,
  updateLocation,
  addNoReserved,
  decreaseNoAndDeleteReserved,
  updateGetsIn
}