import { apiClient } from "../axios/api";

// Add a Shop
export const addShop = async (
    businessRegNumber,
    name,
    email,
    shopManagerName,
    numberOfEmployees,
    userId
  ) => {
    console.log("userId", userId);
    const response = await apiClient.post(`shop/addShop`, {
      ShopDTO: {
        BuisnessRegNumber: businessRegNumber,
        Name: name,
        Email: email,
        ShopManagerName: shopManagerName,
        NumerOfEmployees: numberOfEmployees,
        userId: userId,
      },
    });
  
    return response.data;
  };
  

