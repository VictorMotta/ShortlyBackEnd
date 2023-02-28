import dotenv from "dotenv";
dotenv.config();

export const SECRET = process.env.SECRET || "shortly";
export const PORT = process.env.PORT || 5000;
