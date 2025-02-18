import express, { json } from "express";
import dotenv from "dotenv";
import { addPostIt, getPostIts } from "./controllers/postit.controller.js";
import { loginUser } from "./controllers/user.controller.js";
import { registerUser } from "./services/user.service.js";

dotenv.config();
const app = express();
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
