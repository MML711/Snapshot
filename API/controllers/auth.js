import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const register = (req, res) => {
  // CHECK IF USER EXISTS

  const q = "SELECT * FROM  users  WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");

    // CREATE A NEW USER
    // HASH PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`, `email`, `password`, `name`, `profilePic`, `coverPic`) VALUEs (?, ?, ?, ?, ?, ?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
      req.body.profilePic,
      req.body.coverPic,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    const checkedPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!checkedPassword)
      return res.status(400).json("Wrong email or password");

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: "15h" });

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: ".localhost",
        maxAge: 15 * 60 * 60 * 1000,
      })
      .status(200)
      .json(others);
      // req.cookie.save((err) => console.log(err));
  });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out")
};
