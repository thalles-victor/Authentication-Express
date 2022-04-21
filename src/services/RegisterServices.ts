import { users } from '../database/UsersDB';

export class RegisterService {
  async createUser(email: string, password: string) {
    try {
      await users.push({ email, password })
      return users[users.length - 1] //return the last user
    } catch (err) {
      console.log("Fail to register user: ", err);
    }
  }

  async findEmail(email: string) {
    const userVerificationEmail = users.find((user) =>
      user.email === email
    )
    return userVerificationEmail ? true : false
  }



  //Remove when finish
  async findAll() {
    return await users;
  }
}