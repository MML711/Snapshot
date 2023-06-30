import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import relationshipRoutes from "./routes/relationships.js";
import storyRoutes from "./routes/stories.js";
import itemRequestRoutes from "./routes/itemRequests.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 7000;

// middleware to acces req.body
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    allowedHeaders: `Origin,X-Requested-With,Content-Type,Accept,Authorization,Set-Cookie`,
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/items", itemRequestRoutes);

app.listen(PORT, () => {
  console.log(`API Server now listening on port ${PORT}`);
});
