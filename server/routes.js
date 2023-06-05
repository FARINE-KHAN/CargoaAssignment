import express  from "express";
import { fetchDash, mDashboard, manufacturerLogin,manufacturerRegister, priceUpdate, singleData } from "./controller/manufacturerController.js";
import { transporterLogin,transporterRegister } from "./controller/transporterController.js";

const router = express.Router()

router.post("/mRegister",manufacturerRegister)
router.post("/mLogin",manufacturerLogin)
router.post("/tRegister",transporterRegister)
router.post("/tLogin",transporterLogin)
router.post("/mDash/:id",mDashboard)
router.put("/price/:id",priceUpdate)
router.get("/dashboard",fetchDash)
router.get("/dashboard/:oid",singleData)


export default router;