const WishesBL = require("../../core/BL/CommunicationBL/Wishes");
class WishesService {
  constructor() {
    this.wishesbl = new WishesBL();
  }
  async GetWishesList(spID) {
    return await this.wishesbl.GetWishesList(spID);
  }
  async AddUpdateWishes(data) {
    return await this.wishesbl.AddUpdateWishes(data);
  }
  async RemoveWishes(data) {
    return await this.wishesbl.RemoveWishes(data);
  }
}

module.exports = WishesService;
