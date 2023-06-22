import { Request, Response } from "express";
import shoppingCartService from "../services/shoppingCart.service";

const createShoppingCart = async (req: Request, res: Response) => {
  try {
    const { wallet, tokenId } = req.body;

    if (!wallet || !tokenId) return res.status(400).send({ message: "wallet and tokenId are required" });

    const saved = await shoppingCartService.createShoppingCart(wallet, tokenId);

    return res.send(saved);
  } catch (error: any) {
    return res.status(500).send(error.message || error);
  }
};

const deleteShoppingCart = async (req: Request, res: Response) => {
  try {
    const { wallet, id } = req.body;

    const resultDelete = await shoppingCartService.deleteShoppingCartById(wallet, id);

    if (resultDelete.affected === 0) return res.status(400).send({ message: "ShoppingCart not found" });
    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).send(error.message || error);
  }
};

const deleteArrayShoppingCart = async (req: Request, res: Response) => {
  try {
    const { wallet, tokenIds } = req.body;

    if (!wallet || !tokenIds) return res.status(400).send({ message: "wallet and tokenId are required" });

    for (let i = 0; i < tokenIds.length; i++) {
      const resultDelete = await shoppingCartService.deleteShoppingCartById(wallet, tokenIds[i]);

      if (resultDelete.affected === 0) continue;
    }

    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).send(error.message || error);
  }
};

const getAllShoppingCart = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.body;
    const allShoppingCart = await shoppingCartService.getAllShoppingCartByWallet(wallet);
    return res.send(allShoppingCart);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

export default { createShoppingCart, deleteShoppingCart, getAllShoppingCart, deleteArrayShoppingCart };
