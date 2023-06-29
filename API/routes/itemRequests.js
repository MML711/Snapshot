import express from "express";
import { getPictures, getFriends, getSuggestions } from "../controllers/itemRequest.js";

const router = express.Router();

router.get("/pictures/:userId", getPictures);
router.get("/friends/:userId", getFriends);
router.get("/suggestions/:userId", getSuggestions);

export default router;
