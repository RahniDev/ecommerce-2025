import express from 'express'
const router = express.Router()

import {
    signup,
    signin,
    signout
} from "../controllers/auth.js";
import { userSignupValidator } from "../validation/index.js";

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

export default router