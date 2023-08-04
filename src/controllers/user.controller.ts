import { Request, Response } from "express";
import userService from "../services/user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.body;

    const saved = await userService.createUser(wallet);

    return res.json(saved);
  } catch (error: any) {
    return res.status(500).send(error.message || error);
  }
};

const getUserByWallet = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.body;

    const user = await userService.getUserByWallet(wallet);

    return res.json(user);
  } catch (error: any) {
    return res.status(500).send(error.message || error);
  }
};

const createLikeTrack = async (req: Request, res: Response) => {
  try {
    const { wallet, tokenId, creatorId } = req.body;

    if (!wallet || !tokenId || !creatorId) return res.status(400).send({ message: "wallet and tokenId are required" });

    const saved = await userService.createLikeTrack(wallet, tokenId, creatorId);

    return res.json(saved);
  } catch (error: any) {
    return res.status(500).send(error.message || error);
  }
};

const deleteLikeTrack = async (req: Request, res: Response) => {
  try {
    const { wallet, tokenId, creatorId } = req.body;
    if (!wallet || !tokenId || !creatorId) return res.status(400).send({ message: "wallet and tokenId are required" });

    const resultDelete = await userService.deleteLikeTrackByWalletToken(wallet, tokenId, creatorId);
    if (resultDelete.affected === 0) return res.status(400).send({ message: "LikeTrack not found" });
    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).send(error.message || error);
  }
};

const deleteLikeTrackById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const resultDelete = await userService.deleteLikeTrackById(id);

    if (resultDelete.affected === 0) return res.status(400).send({ message: "LikeTrack not found" });
    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).send(error.message || error);
  }
};

const getAllLikeTrack = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.body;
    const allLikeTrack = await userService.getAllLikeTrackByWallet(wallet);
    return res.send(allLikeTrack);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

export default { createUser, getUserByWallet, createLikeTrack, deleteLikeTrack, getAllLikeTrack, deleteLikeTrackById };
