import { Request, Response, Router } from "express";
import shoppingCartController from "../controllers/shoppingCart.controller";

const router = Router();

router.post("/add-shopping-cart/", shoppingCartController.createShoppingCart);

router.post("/delete-shopping-cart/", shoppingCartController.deleteShoppingCart);

router.post("/delete-array-shopping-cart/", shoppingCartController.deleteArrayShoppingCart);

router.post("/get-all-shopping-cart/", shoppingCartController.getAllShoppingCart);

export { router };
