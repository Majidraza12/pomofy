import express from "express";
import { storeSession, getSessionsByUser } from "../controllers/sessions.controller.js";
const router = express.Router();

router.post("/getSessions", getSessionsByUser);
router.post("/store", storeSession);

export default router;
