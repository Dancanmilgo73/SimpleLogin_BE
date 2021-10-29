const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const port = 3000;

const users = [];
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.json(users);
});

app.post("/signup", async (req, res) => {
  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  const { email, username, password, confirmPassword } = req.body;
  if (!email || !username || !password || !confirmPassword) {
    res.status(406).send("fill in all credentials");
  }
  if (!regex.test(password)) {
    res
      .status(406)
      .send(
        "Password must be atleast 8 characters long and contain small letters, capital letters, special characters and numbers"
      );
  }
  try {
    // const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, name: username, password: hashedPassword };
    users.push(user);
    console.log(users);
  } catch {
    res.status(500).send();
  }
  res.status(201).send("User was added");
  // return;
});
app.listen(port, () => {
  console.log(`app listenig on port ${port}`);
});
