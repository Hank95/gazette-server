const express = require("express");
const cors = require("cors");

const { sequelize, User } = require("./models");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  try {
    const newUser = await User.create({ username, email, password });

    return res.json(newUser);
  } catch (err) {
    console.log(err, req.body);
    return res.status(500).json(err);
  }
});

app.get("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const currentUser = await User.findOne({ username: username });
    if (currentUser.password === password) {
      return res.json(currentUser);
    } else {
      return res.json({ error: "Password Incorrect" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", details: err });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", details: err });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log(`Listening: http://localhost:${port}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
