import userService from "./user.service";
import ApolloQuerys from "../helpers/apolloQuerys";
import CryptoHelper from "../helpers/crypto";

const getNftsByWallet = async (wallet: string) => {
  try {
    let nfts = await ApolloQuerys.getNftsByWallet(wallet);
    const dataNfts: any[] = [];
    for (let i = 0; i < nfts.length; i++) {
      let nft = nfts[i];

      const extra = JSON.parse(nft.metadata.extra);
      const item = extra.find((element: any) => element.trait_type === "track_full");

      if (item) {
        const track = CryptoHelper.decrypt(item.value);
        const datos = {
          trackFull: track,
          ...nft,
        };
        dataNfts.push(datos);
      } else {
        continue;
      }
    }

    return dataNfts;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to get collection: ${err}`);
  }
};

export default { getNftsByWallet };
