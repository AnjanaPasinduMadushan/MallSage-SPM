import { apiClient } from "../axios/api";

// Add a Baggage employee
export const addBaggageEmployee = async (Name, Email, Address,userId) => {
  const response = await apiClient.post(`baggage/addBaggageEmployee`, {
    BaggageEmployeeDTO: {
      Name: Name,
      Email: Email,
      Address: Address,
      userId: userId,
    },
  });

  return response.data;
};
