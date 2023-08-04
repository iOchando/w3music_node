import { LikeTrackEntity } from "../entities/likeTrack.entity";
import { UserEntity } from "../entities/user.entity";
import trackService from "./track.service";

const createUser = async (wallet: string) => {
  try {
    const user = new UserEntity();

    user.wallet = wallet;

    const userSaved = await user.save();

    return userSaved;
  } catch (err) {
    throw new Error(`Failed to create user`);
  }
};

const getUserByWallet = async (wallet: string) => {
  return await UserEntity.findOneBy({ wallet });
};

const createLikeTrack = async (wallet: string, tokenId: string, creatorId: string) => {
  try {
    const user = await getUserByWallet(wallet);
    if (!user) throw new Error(`User does not exists.`);

    const existLike = await getLikeTrack(wallet, tokenId);
    if (existLike) return null;

    const track = await trackService.getTrack(tokenId);

    if (track) {
      await trackService.updateTrack(tokenId, {likes: track.likes + 1});
    } else {
      await trackService.createTrack(tokenId, creatorId, true, false);
    }

    const likeTrack = new LikeTrackEntity();
    likeTrack.user = user;
    likeTrack.tokenId = tokenId;
    const likeTrackSaved = await likeTrack.save();

    return likeTrackSaved;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to create like track`);
  }
};

const deleteLikeTrackById = async (id: string) => {
  try {
    return await LikeTrackEntity.delete({ id });
  } catch (err) {
    throw new Error(`Failed to delete LikeTrack: ${err}`);
  }
};

const deleteLikeTrackByWalletToken = async (wallet: string, tokenId: string, creatorId: string) => {
  try {
    const like = await getLikeTrack(wallet, tokenId);
    if (!like) throw new Error(`LikeTrack does not exists.`);

    const track = await trackService.getTrack(tokenId);

    if (track) {
      await trackService.updateTrack(tokenId, {likes: track.likes - 1});
    } else {
      await trackService.createTrack(tokenId, creatorId, false, false);
    }

    return await LikeTrackEntity.delete({ id: like.id });
  } catch (err) {
    throw new Error(`Failed to delete LikeTrack: ${err}`);
  }
};

const getLikeTrack = async (wallet: string, tokenId: string) => {
  return await LikeTrackEntity.findOneBy({ user: { wallet }, tokenId });
};

const getAllLikeTrackByWallet = async (wallet: string) => {
  try {
    const shoppingCarts = await LikeTrackEntity.findBy({ user: { wallet } });
    return shoppingCarts;
  } catch (err) {
    throw new Error(`Failed to get All LikeTrack: ${err}`);
  }
};

export default { createUser, getUserByWallet, createLikeTrack, deleteLikeTrackById, getAllLikeTrackByWallet, deleteLikeTrackByWalletToken };
