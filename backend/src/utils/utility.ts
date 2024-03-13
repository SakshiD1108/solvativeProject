import "dotenv/config";
import { genSaltSync, hashSync } from "bcryptjs";

export const encryptPassword = (password: string): string => hashSync(password, genSaltSync(10));


