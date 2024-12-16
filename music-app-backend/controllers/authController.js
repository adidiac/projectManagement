const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { executeQuery } = require("../models/queries");
require("dotenv").config();

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await executeQuery(
      "INSERT INTO Users (email, password, name) VALUES (@Email, @Password, @Name)",
      [
        { name: "Email", type: sql.NVarChar, value: email },
        { name: "Password", type: sql.NVarChar, value: hashedPassword },
        { name: "Name", type: sql.NVarChar, value: name },
      ]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await executeQuery(
      "SELECT * FROM Users WHERE email = @Email",
      [{ name: "Email", type: sql.NVarChar, value: email }]
    );
    if (!users.length) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, users[0].password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};