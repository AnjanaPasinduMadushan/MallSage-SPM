class ShopDTO {
    constructor({
      BuisnessRegNumber,
      Name,
      Email,
      ShopManagerName,
      NumerOfEmployees,
    }) {
      this.BuisnessRegNumber = BuisnessRegNumber;
      this.Name = Name;
      this.Email = Email;
      this.ShopManagerName = ShopManagerName;
      this.NumerOfEmployees = NumerOfEmployees;
      this.userId = userId;
    }
  }
  
  export default ShopDTO;
  