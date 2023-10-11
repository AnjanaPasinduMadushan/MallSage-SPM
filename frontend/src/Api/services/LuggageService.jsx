import { apiClient } from "../axios/api";

// Add a Luggage
export const addLuggage = async (
  CustomerID,
  CustomerEmail,
  BagNo,
  Bill,
  ShopID,
  ShopName
) => {
  const shop = {
    ShopID: ShopID,
    ShopName: ShopName,
  };
  const response = await apiClient.post(`luggage/addLuggage`, {
    LuggageDTO: {
      CustomerID: CustomerID,
      CustomerEmail: CustomerEmail,
      BagNo: BagNo,
      Bill: Bill,
      Shop: shop,
    },
  });

  return response.data;
};

// get Luggage by userId
export const getLuggageIdByUserId = async (userId) => {
  const response = await apiClient.get(`luggage/getLuggagebyUseremail/${userId}`);
  console.log("response", response)
  return response.data;
}

// Update a Luggage
export const updateLuggageCustomer = async (
  lugageid,
  Exit,

) => {
  console.log("Exit", Exit);
  console.log("lugageid", lugageid);
  const response = await apiClient.patch(`luggage/updateLuggage/${lugageid}`, {
    Exit: Exit,
    isCustomerConfirmed: "true",
  },
  );

  return response.data;
};

//Get All Luggages all customer view 
export const getAllLuggages = async (email) => {
  const response = await apiClient.get(`luggage/getallLuggagescustomer/${email}`);
  return response.data;
};

//Get All Luggages by Shop ID and user ID 
export const getAllLuggagesbyUserIDandShopID = async (shopID, userId) => {
  const response = await apiClient.get(`luggage/getluggagesbyshopIDandUserID/${shopID}/${userId}`);
  return response.data;
};

//Get All Luggages by ShopID and Date
export const getLuggagesByShopIDandDate = async (shopID, date) => {
  console.log("shopID", shopID);
  const response = await apiClient.get(`luggage/getluggagesbyshop/${shopID}/${date}`);
  return response.data;
};


//Get All Luggages by shop ID
export const getLuggagesByShopID = async (shopID) => {
  const response = await apiClient.get(`luggage/getluggagesbyshopID/${shopID}`);
  return response.data;
};

//Validate Token
export const validateToken = async (token) => {
  console.log("token", token)
  const response = await apiClient.patch(`luggage/validateShopToken/${token}`);
  return response.data;
};

//Get Luggages by userId and Date
export const getLuggagesByuserIdandDate = async (userId, date) => {
  const response = await apiClient.get(`luggage/getluggagesbyshop/${userId}/${date}`);
  return response.data;
};