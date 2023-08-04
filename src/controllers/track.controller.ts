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

export default { playTrack };
