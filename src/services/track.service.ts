import { TrackEntity } from "../entities/track.entity";

const createTrack = async (tokenId: string, creatorId: string, like?: boolean, play?: boolean) => {
  try {
    console.log(like, play);
    const track = new TrackEntity();

    track.creatorId = creatorId;
    track.tokenId = tokenId;

    if (like) {
      track.likes = 1;
    }
    if (play) {
      track.plays = 1;
    }

    const trackSaved = await track.save();

    return trackSaved;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to create track`);
  }
};

const getTrack = async (tokenId: string) => {
  return await TrackEntity.findOneBy({ tokenId });
};

const getTracksMostPlays = async () => {
  return await TrackEntity.find({
    order: {
      plays: {
        direction: "DESC",
      },
    },
  });
};

const getTracksMostLikes = async () => {
  return await TrackEntity.find({
    order: {
      likes: {
        direction: "DESC",
      },
    },
  });
};

const updateTrack = async (tokenId: string, body: any) => {
  const result = await TrackEntity.update({ tokenId: tokenId }, body);

  if (result.affected === 0) throw new Error(`Failed to updated track.`);

  return result;
};

const playTrack = async (wallet: string, tokenId: string, creatorId: string) => {
  try {
    const track = await getTrack(tokenId);
    if (track) {
      if (track.creatorId !== wallet) {
        await updateTrack(tokenId, { plays: track.plays + 1 });
      }
      return track;
    } else {
      if (creatorId !== wallet) {
        return await createTrack(tokenId, creatorId, false, true);
      } else {
        return await createTrack(tokenId, creatorId, false, false);
      }
    }
  } catch (err) {
    throw new Error(`Failed to play track`);
  }
};

const getTracksByCreator = async (wallet: string) => {
  return await TrackEntity.find({ where: { creatorId: wallet } });
};

export default { createTrack, getTrack, updateTrack, playTrack, getTracksByCreator, getTracksMostPlays, getTracksMostLikes };
