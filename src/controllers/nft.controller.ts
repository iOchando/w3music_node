import { Request, Response } from "express";
import nftService from "../services/nft.service";

const getCollectionByWallet = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.body;
    const dataNfts = await nftService.getNftsByWallet(wallet);
    return res.json(dataNfts);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

export default { getCollectionByWallet };
