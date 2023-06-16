import { UserEntity } from "../entities/user.entity";

const createUser = async (wallet: string, email?: string) => {
  try {
    const user = new UserEntity();

    user.wallet = wallet;
    email ? (user.email = email) : undefined;

    const userSaved = await user.save();

    return userSaved;
  } catch (err) {
    throw new Error(`Failed to create user`);
  }
};

export default { createUser };
