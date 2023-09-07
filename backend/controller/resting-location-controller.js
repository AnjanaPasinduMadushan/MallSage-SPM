import RestingLocations from "../model/resting-location-model.js";

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


const addNoReserved = async (req, res, next) => {

  const id = req.params.id;
  const noReserved = req.body.noReserved;
  const noIntReserved = parseInt(noReserved);

  let location;

  try {
    location = await RestingLocations.findByIdAndUpdate(id,
      { $inc: { noReserved: noIntReserved } },
      { new: true })
  } catch (err) {
    console.log(err)
  }

  if (!location) {
    return res.status(404).json({ message: "Unable to update Location details or location is not added" })
  }

  return res.status(200).json({ message: "Location Updated successfully" })

}

const decreaseNoReserved = async (req, res, next) => {

  const id = req.params.id;
  const noReserved = req.body.noReserved;
  const noIntReserved = parseInt(noReserved);

  let location;

  try {
    location = await RestingLocations.findByIdAndUpdate(id,
      { $inc: { noReserved: - noIntReserved } },
      { new: true })
  } catch (err) {
    console.log(err)
  }

  if (!location) {
    return res.status(404).json({ message: "Unable to update Location details or location is not added" })
  }

  return res.status(200).json({ message: "Location Updated successfully" })

}

export { addLocation, getOneLocation, getLocations, deleteLocation, updateLocation, addNoReserved, decreaseNoReserved }