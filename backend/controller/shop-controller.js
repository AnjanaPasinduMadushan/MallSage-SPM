import _ from "lodash";
import Shop from "../model/Shop-model.js";
import ShopDTO from "../dto/ShopDTO.js";

const addShop = async (req, res) => {
  const { ShopDTO } = req.body;

  console.log(req.body);

  try {
    let randomShopID;
    let isUnique = false;

    // Keep generating random IDs until a unique one is found
    while (!isUnique) {
      randomShopID = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number

      // Check if the generated ID already exists in the database
      const existingShop = await Shop.findOne({
        ShopID: randomShopID,
      });

      if (!existingShop) {
        isUnique = true;
      }
    }

    console.log("ShopDTO", ShopDTO);

    const shop = new Shop({
      ShopID: randomShopID,
      BuisnessRegNumber: ShopDTO.BuisnessRegNumber,
      Name: ShopDTO.Name,
      Email: ShopDTO.Email,
      ShopManagerName: ShopDTO.ShopManagerName,
      NumerOfEmployees: ShopDTO.NumerOfEmployees,
      userId: ShopDTO.userId,
    });

    await shop.save();
    return res.status(201).json({ message: "Shop is Added", Shop: shop });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Error occurred in adding Shop" });
  }
};

const getOneShop = async (req, res) => {
  const shopId = req.params.shopId;

  try {
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return res.status(404).json({ message: "Shop is not found" });
    } else {
      res.status(200).json({ shop });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in getting the Shop" });
  }
};

const getShops = async (req, res) => {
  try {
    const shops = await Shop.find();

    if (!shops) {
      return res.status(404).json({ message: "No Shops added" });
    } else {
      res.status(200).json({ shops });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in getting the Shops" });
  }
};

const deleteShop = async (req, res, next) => {
  const id = req.params.id;
  let shop;

  try {
    shop = await Shop.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in deleting the Shop" });
  }

  if (!shop) {
    return res
      .status(400)
      .json({ message: "Shop is already deleted or not added" });
  }

  return res.status(200).json({ message: "Shop deleted successfully" });
};

const updateShop = async (req, res, next) => {
  const id = req.params.id;

  let shop;

  try {
    shop = await Shop.findByIdAndUpdate(id, req.body, { new: true });
  } catch (err) {
    console.log(err);
  }

  if (!shop) {
    return res.status(404).json({
      message: "Unable to update Shop details or shop is not added",
    });
  }

  return res.status(200).json({ message: "Shop Updated successfully" });
};

export { addShop, getOneShop, getShops, deleteShop, updateShop };
