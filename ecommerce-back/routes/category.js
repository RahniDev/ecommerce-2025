import express from 'express'
const router = express.Router()

import { requireSignin, isAuth, isAdmin } from '../controllers/auth.js'
import { create, categoryById, read, update, remove, list } from "../controllers/category.js";
import { userById } from '../controllers/user.js'


router.get('/category/:categoryId', read)
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update);

router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove);
router.get('/categories/', list)

router.param('categoryId', categoryById)
router.param('userId', userById)

export default router;
