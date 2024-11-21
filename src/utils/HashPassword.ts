import bcrypt from "bcrypt";

const saltRounds = 10;

export async function CreateHashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function CheckUserPassword(password: string, hash: string) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.log(error);
    return null;
  }
}