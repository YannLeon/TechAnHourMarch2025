import { Router } from "express";
import { getPostIts, addPostIt } from "../controllers/postit.controller";

const router = Router();

router.get("/", getPostIts);
router.post("/", addPostIt);

export default router;
