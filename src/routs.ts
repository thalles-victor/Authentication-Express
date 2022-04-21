import 'dotenv'
import * as bcrypt from 'bcrypt';
import express from 'express';
import type { Request, Response } from 'express';
import type { User } from './TypesAndInterfaces/User';
import { RegisterService } from './services/RegisterServices';
import { LoginService } from './services/LoginServicres';

const router = express.Router();

const registerService = new RegisterService();
const loginService = new LoginService();

router.get("/", async function (req: Request, res: Response) {
  const data = await registerService.findAll();
  res.status(200).send(data)
})

router.post("/singup", async (req, res) => {
  const body = req.body;

  if (!(body.email && body.password)) {
    return res.status(400).send({
      error: "Data not formatted property"
    })
  }

  console.log(registerService.findEmail(body.email))
  if (await registerService.findEmail(body.email)) {
    return res.status(400).send({
      error: "This user exist"
    })
  }

  const salt = await bcrypt.genSalt(10);

  const email = body.email;
  const password = await bcrypt.hash(body.password, salt);

  const user = await registerService.createUser(email, password);

  res.status(200).send(user);
});

router.post('/singin', async function (req: Request, res: Response) {
  const body = req.body;
  const user = await loginService.findOneUser(body.email);
  if (user) {
    //Check user password with hashed password stored in the database
    const isValidPassord = await bcrypt.compare(body.password, user.password);
    if (isValidPassord) {
      res.status(200).json({ message: "Valid password" });
      //return JWT
    } else {
      res.status(300).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
});

module.exports = router;