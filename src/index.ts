import express from 'express';
const routs = require('./routs');


const app = express();

app.use(express.json());

app.use("/auth", routs);

app.listen(3000, () => console.log("Running on port 3000"));