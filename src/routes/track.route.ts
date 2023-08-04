import { Request, Response, Router } from "express";
import trackController from "../controllers/track.controller";

const router = Router();

router.post("/play-track/", trackController.playTrack);

export { router };
