import { Request, Response } from "express";
import userService from "../services/user.service";
import trackService from "../services/track.service";

const playTrack = async (req: Request, res: Response) => {
  try {
    const { wallet, tokenId, creatorId } = req.body;

    if (!wallet || !tokenId || !creatorId) return res.status(400).send({ message: "wallet, tokenId and creatorId are required" });

    const play = await trackService.playTrack(wallet, tokenId, creatorId);

    return res.json(play);
  } catch (error: any) {
    return res.status(500).send(error.message || error);
  }
};

const getTracksByCreator = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.body;
    if (!wallet) return res.status(400).send({ message: "wallet are required" });
    const tracks = await trackService.getTracksByCreator(wallet);
    return res.json(tracks);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const getTracksMostPlays = async (req: Request, res: Response) => {
  try {
    const tracks = await trackService.getTracksMostPlays();
    return res.json(tracks);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

const getTracksMostLikes = async (req: Request, res: Response) => {
  try {
    const tracks = await trackService.getTracksMostLikes();
    return res.json(tracks);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

export default { playTrack, getTracksByCreator, getTracksMostPlays, getTracksMostLikes };
