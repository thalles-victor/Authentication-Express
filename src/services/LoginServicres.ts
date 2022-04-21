import { users } from '../database/UsersDB';

export class LoginService {
  async findOneUser(email: string) {
    const user = await users.find((user) =>
      user.email === email
    )
    return user
  }
}