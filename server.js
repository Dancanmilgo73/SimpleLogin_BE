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
  const { email, username, password, confirmPassword } = req.body;
  try {
    if (!email || !username || !password || !confirmPassword)
      res.status(401).send("fill in all credentials");

    if (password !== confirmPassword)
      res.status(401).send("Confirm password do not match");

    checkPasswordStrength(password);
    // const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, name: username, password: hashedPassword };
    users.push(user);
    console.log(users);
    res.status(201).send("User was added");
  } catch {
    res.status(500).send();
  }
  function checkPasswordStrength(password) {
    const checkForLength = new RegExp("^(?=.{8,})");
    const checkForSymbols = new RegExp("^(?=.*[!@#$%^&*])");
    const checkForCapsLettersNumbers = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"
    );
    if (!checkForLength.test(password))
      res.status(401).send("Password must be atleast 8 characters long ");

    if (!checkForSymbols.test(password))
      res.status(401).send("Password must contain atleast 1 symbol");

    if (!checkForCapsLettersNumbers.test(password))
      res
        .status(401)
        .send("Password must contain small, letters caps and numbers");
  }
});
app.listen(port, () => {
  console.log(`app listenig on port ${port}`);
});
