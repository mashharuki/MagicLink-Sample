import { Magic } from "magic-sdk";
import dotenv from "dotenv";

dotenv.config();

const {
    MAGIC_API_KEY,
    ALCHEMY_API_KEY
} = process.env;

// Initialize the Magic instance
export const magic = new Magic(`${MAGIC_API_KEY}`, {
  network: {
    rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    chainId: 11155111,
  },
})