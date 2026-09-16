import { singup } from "../controllers/auth.controller.js";
import express from 'express';

const router = express.Router()
router.post('/singup', singup)

export default router