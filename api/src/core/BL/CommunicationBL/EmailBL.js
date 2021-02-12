
const EmailDL = require('../../DL/communicationDL/EmailDL');
const emailDL = new EmailDL();

class EmailBL {
  async GetDropDownDataBL(req) {
    return await emailDL.GetDropDownDataDL(req)
  }

  async SetAddUpdateEmailBL(req) {
    return await emailDL.SetAddUpdateEmailDL(req)
  }
  async GetEmailListBL(req) {
    return await emailDL.GetEmailListDL(req)
  }
  async RemoveEmailBL(req) {
    return await emailDL.RemoveEmailDL(req)
  }
  async SetEmailTemplatetoActivityBL(req) {
    return await emailDL.SetEmailTemplatetoActivityDL(req)
  }
 
 
}

module.exports = EmailBL;