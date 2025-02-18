import express, { json } from "express";
import dotenv from "dotenv";
import { addPostIt, getPostIts } from "./controllers/postit.controller.js";

dotenv.config();
const app = express();
app.use(json());

const PORT = process.env.PORT || 3000;

// Routes
app.get("/postits", getPostIts);
app.post("/postits", addPostIt);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
