import { Request, Response, Router } from "express";
import nftController from "../controllers/nft.controller";

const router = Router();

router.post("/get-collection/", nftController.getCollectionByWallet);

export { router };
