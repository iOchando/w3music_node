import { ShoppingCartEntity } from "../entities/shoppingCart.entity";
import ApolloQuerys from "../helpers/apolloQuerys";

const createShoppingCart = async (wallet: string, tokenId: string) => {
  try {
    const shoppingCart = new ShoppingCartEntity();

    shoppingCart.wallet = wallet;
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

const getAllShoppingCartByWallet = async (wallet: string) => {
  try {
    const shoppingCarts = await ShoppingCartEntity.findBy({ wallet });
    const nfts = await ApolloQuerys.getNftByTokenIds(shoppingCarts.map((shoppingCart) => shoppingCart.tokenId));

    // const dataNfts = shoppingCarts.map((shoppingCart) => {
    //   return nfts.find((nft: any) => {
    //     if (nft.id === shoppingCart.tokenId) {
    //       return {
    //         ...nft,
    //         ...shoppingCart,
    //       };
    //     }
    //   });
    // });

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

export default { createShoppingCart, deleteShoppingCartById, getAllShoppingCartByWallet };
