import express, { json } from "express";
import dotenv from "dotenv";
import { addPostIt, getPostIts } from "./controllers/postit.controller.js";
import { loginUser } from "./controllers/user.controller.js";
import { registerUser } from "./controllers/user.controller.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(json());

const PORT = process.env.PORT || 3000;

// Routes
app.get("/postits", getPostIts);
app.post("/postits", addPostIt);

app.post("/user/login", loginUser);
app.post("/user/register", registerUser);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
