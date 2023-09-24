import { apiClient } from "../axios/api";

// Add a Luggage
export const addLuggage = async (
  CustomerID,
  CustomerEmail,
  BagNo,
  Bill,
  ShopID
) => {
  const response = await apiClient.post(`luggage/addLuggage`, {
    LuggageDTO: {
      CustomerID: CustomerID,
      CustomerEmail: CustomerEmail,
      BagNo: BagNo,
      Bill: Bill,
      ShopID: ShopID,
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