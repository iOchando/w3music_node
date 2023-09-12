import { Request, Response, Router } from "express";
import trackController from "../controllers/track.controller";

const router = Router();

router.post("/play-track/", trackController.playTrack);

router.post("/get-tracks-creator/", trackController.getTracksByCreator);

router.get("/get-tracks-plays/", trackController.getTracksMostPlays);

router.get("/get-tracks-likes/", trackController.getTracksMostLikes);

export { router };
