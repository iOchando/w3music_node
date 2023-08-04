import { ShoppingCartEntity } from "../entities/shoppingCart.entity";
import userService from "./user.service";
import ApolloQuerys from "../helpers/apolloQuerys";

const createShoppingCart = async (wallet: string, tokenId: string) => {
  try {
    const user = await userService.getUserByWallet(wallet);
    if (!user) throw new Error(`User does not exists.`);

    const existCart = await getShoppingCart(wallet, tokenId);
    if (existCart) throw new Error(`Shopping Cart exists.`);;

    const shoppingCart = new ShoppingCartEntity();

    shoppingCart.user = user;
    shoppingCart.tokenId = tokenId;

    const shoppingCartSaved = await shoppingCart.save();

    return shoppingCartSaved;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to create ShoppingCart`);
  }
};

const deleteShoppingCartById = async (wallet: string, id: string) => {
  try {
    return await ShoppingCartEntity.delete({ id });
  } catch (err) {
    throw new Error(`Failed to delete ShoppingCart: ${err}`);
  }
};

const getShoppingCart = async (wallet: string, tokenId: string) => {
  return await ShoppingCartEntity.findOneBy({ user: { wallet }, tokenId });
};

const getAllShoppingCartByWallet = async (wallet: string) => {
  try {
    const shoppingCarts = await ShoppingCartEntity.findBy({ user: {wallet} });
    const nfts = await ApolloQuerys.getNftByTokenIds(shoppingCarts.map((shoppingCart) => shoppingCart.tokenId));

    const dataNfts = shoppingCarts
      .map((shoppingCart) => {
        const matchingNFT = nfts.find((nft: any) => nft.id === shoppingCart.tokenId);

        if (matchingNFT) {
          return {
            ...matchingNFT,
            ...shoppingCart,
          };
        }
      })
      .filter((item) => item !== undefined);

    return dataNfts;
  } catch (err) {
    throw new Error(`Failed to get All ShoppingCart: ${err}`);
  }
};

export default { createShoppingCart, deleteShoppingCartById, getAllShoppingCartByWallet, getShoppingCart };
