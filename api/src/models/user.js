// interface IUser {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   salt: string;
// }

//  interface IUserInputDTO {
//   name: string;
//   email: string;
//   password: string;
// }
class User{
  constructor() {
    this.email = 'useremail';
    this.password = 'password';
  }

  set email(email) {
    this._email = email.toLowerCase();
  }
  get email() {
    return this._email;
  }
  set name(name) {
    this._name = name.toLowerCase();
  }
  get name() {
    return this._name;
  }

  set password(password) {
    this._name = password;
  }
  get password() {
    return this._password;
  }
 
}
module.exports = User;


