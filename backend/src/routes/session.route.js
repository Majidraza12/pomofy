import express from "express";
import { storeSession, getSessionsByUser } from "../controllers/sessions.controller.js";
const router = express.Router();

router.post("/store", storeSession);
router.get("/getSessions", getSessionsByUser);

export default router;
