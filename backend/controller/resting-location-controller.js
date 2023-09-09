import RestingLocations from "../model/resting-location-model.js";
import _ from 'lodash';

const addLocation = async (req, res) => {
  const { locationName, locationPlaced, locationFeatures, availability } = req.body;

  console.log(req.body);

  try {
    const location = new RestingLocations({
      locationName,
      locationPlaced,
      locationFeatures,
      availability
    })
    await location.save();
    return res.status(201).json({ message: "Location is Added", RestingLocations: location })
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

  let location;

  try {
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
  const noReservedObject = req.body.Reserved;
  console.log(req.body);
  let location;

  try {
    location = await RestingLocations.findById(id);

    if (!location) {
      return res.status(404).json({ message: "Unable to update Location details or location is not added" })
    }

    // Validate 'noReservedObject' and 'no' property
    if (!_.isArray(noReservedObject) && noReservedObject.length === 0) {
      return res.status(400).json({ message: "Invalid 'Reserved' data" });
    }

    const firstIndex = noReservedObject[0];

    if (!_.isNumber(firstIndex.no) && !_.isNaN(firstIndex.no)) {
      return res.status(400).json({ message: "Invalid 'no' value" });
    }

    const uniqueNo = Math.floor((1000 + Math.random() * 9000));

    const newReservation = location.Reserved.create({
      no: firstIndex.no,
      qrCode: uniqueNo,
    });

    location.currentNoReserved += firstIndex.no;
    if (location.currentNoReserved > location.availability) {
      return res.status(403).json({ message: "Currently, isnt have enough spaces for all of you!!!" })
    }
    location.Reserved.push(newReservation);
    await location.save();

    return res.status(200).json({ message: "Location Updated successfully", uniqueNo });
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
    console.log(location.Reserved[indexToChange].isGetsIn)
    if (indexToChange === -1) {
      return res.status(404).json({ message: "Invalid Status code!!!" });
    } else if (!(location.Reserved[indexToChange].isGetsIn)) {
      console.log(location.Reserved[indexToChange].isGetsIn)
      location.Reserved[indexToChange].isGetsIn = true;
    } else {
      return res.status(400).json({ message: "Already Inside the Location." });
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
      return res.status(404).json({ message: "QR code not found in reservations" });
    }

    if (body && body.no && _.isNumber(body.no) && !_.isNaN(body.no) && body.no != 0) {
      location.Reserved[indexToRemove].no -= body.no;
      location.currentNoReserved -= body.no;
      console.log('not splice')
    } else {
      location.currentNoReserved -= location.Reserved[indexToRemove].no;
      location.Reserved.splice(indexToRemove, 1);
      console.log('splice')
    }

    console.log(location.currentNoReserved);
    await location.save();

    return res.status(200).json({ message: "Location Updated successfully" })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

}

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