class LuggageDTO {
    constructor({
      CustomerID,
      CustomerEmail,
      TimeDuration,
      SecurityCheckPoint,
      SecurityID,
      SecurityAdminID,
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
    }
  }
  
  export default LuggageDTO;
  