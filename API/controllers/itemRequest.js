import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getPictures = (req, res) => {
  const userId = req.params.userId;

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `SELECT p.img, p.createdAt FROM posts AS p WHERE p.userId = ? UNION SELECT s.img, s.createdAt FROM stories as s WHERE s.userId = ? ORDER BY createdAt DESC`;

    db.query(q, [userId, userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getFriends = (req, res) => {
  const userId = req.params.userId;

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `SELECT u.id AS userId, name, username, profilePic FROM users AS u
          LEFT JOIN relationships AS r ON (u.id = followedUserId) WHERE r.followerUserId = ? ORDER BY u.id DESC`;

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getSuggestions = (req, res) => {
  const userId = req.params.userId;

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `SELECT u.id AS userId, name, username, profilePic FROM users AS u
          LEFT JOIN relationships AS r ON (u.id = r.followedUserId AND r.followerUserId = ?) WHERE r.followedUserId IS NULL AND u.id != ? ORDER BY u.id DESC`;

    db.query(q, [userId, userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
