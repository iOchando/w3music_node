import { Request, Response } from "express";
import userService from "../services/user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { wallet, email } = req.body;

    const saved = await userService.createUser(wallet, email);

    return res.send(saved);
  } catch (error: any) {
    return res.status(500).send(error.message || error);
  }
};

export default { createUser };
