class AddBaggageEmployeeDTO {
    constructor({
        Name,
        Email,
        Address,
        ShopDetails,
        CutsomerID,
        CustomerEmail,
        BaggageConfirmed,
        Completed,
    }) {
      this.Name = Name;
      this.Email = Email;
      this.Address = Address;
      this.ShopDetails = ShopDetails;
      this.CutsomerID = CutsomerID;
      this.CustomerEmail = CustomerEmail;
      this.BaggageConfirmed = BaggageConfirmed;
      this.Completed = Completed;
      this.userId = userId;
    }
  }
  
  export default AddBaggageEmployeeDTO;
  