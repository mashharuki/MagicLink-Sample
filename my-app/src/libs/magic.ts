import { Magic } from "magic-sdk";

const {
  REACT_APP_MAGIC_API_KEY,
  REACT_APP_ALCHEMY_API_KEY
} = process.env;

console.log("API:", REACT_APP_MAGIC_API_KEY)

// Initialize the Magic instance
export const magic = new Magic(`${REACT_APP_MAGIC_API_KEY}`, {
  network: {
    rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${REACT_APP_ALCHEMY_API_KEY}`,
    chainId: 11155111,
  },
})