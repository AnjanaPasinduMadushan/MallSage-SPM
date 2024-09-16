class LuggageDTO {
  constructor({
    CustomerID,
    CustomerEmail,
    ShopID, // Add ShopID parameter
    BagNo,  // Add BagNo parameter
    Bill,   // Add Bill parameter
    TimeDuration,
    SecurityCheckPoint,
    SecurityID,
    SecurityAdminID,
    isComplete,
    isSecurityConfirmed,
    isCustomerConfirmed,
  }) {
    this.CustomerID = CustomerID;
    this.CustomerEmail = CustomerEmail;
    this.ShopID = ShopID; // Assign ShopID parameter
    this.BagNo = BagNo;   // Assign BagNo parameter
    this.Bill = Bill;     // Assign Bill parameter
    this.TimeDuration = TimeDuration;
    this.SecurityCheckPoint = SecurityCheckPoint;
    this.SecurityID = SecurityID;
    this.SecurityAdminID = SecurityAdminID;
    this.isComplete = isComplete;
    this.isSecurityConfirmed = isSecurityConfirmed;
    this.isCustomerConfirmed = isCustomerConfirmed;
  }
}

export default LuggageDTO;
