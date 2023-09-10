class LuggageDTO {
    constructor({
      CustomerID,
      CustomerEmail,
      TimeDuration,
      SecurityCheckPoint,
      SecurityID,
      SecurityAdminID,
      isSecurityConfirmed,
      isCustomerConfirmed,

    }) {
      this.CustomerID = CustomerID;
      this.CustomerEmail = CustomerEmail;
      this.ShopID = ShopID;
      this.BagNo = BagNo;
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
  