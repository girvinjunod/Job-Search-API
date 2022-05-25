import { Router } from "express";
import verifyJWT  from "../middlewares/jwtAuth";
import temp from "../controllers/temp.controller";

const tempRoute = Router();

tempRoute.get("/tes", verifyJWT, temp.tes);

export default tempRoute;