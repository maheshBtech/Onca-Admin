const WishesDL = require("../../DL/Communication/WishesDL");
class WishesBL {
  constructor() {
    this.wishesdl = new WishesDL();
  }
  async GetWishesList(spID) {
    return await this.wishesdl.GetWishesList(spID);
  }
  async AddUpdateWishes(data) {
    return await this.wishesdl.AddUpdateWishes(data);
  }
  async RemoveWishes(data) {
    return await this.wishesdl.RemoveWishes(data);
  }
}
module.exports = WishesBL;
