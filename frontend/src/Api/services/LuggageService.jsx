import { apiClient } from "../axios/api";

// Add a Luggage
export const addLuggage = async (
    CustomerID,
    CustomerEmail,
    BagNo,
    ShopID
  ) => {
    const response = await apiClient.post(`luggage/addLuggage`, {
        LuggageDTO: {
        CustomerID: CustomerID,
        CustomerEmail: CustomerEmail,
        BagNo: BagNo,
        ShopID: ShopID,
      },
    });
  
    return response.data;
  };
  