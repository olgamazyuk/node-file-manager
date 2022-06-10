import { stat, readFileSync } from "node:fs";
import { createHash } from "crypto";

export const hash = async (filePath) => {
  const isFile = stat(filePath).isFile();
  try {
    if (isFile) {
      const file = readFileSync(filePath);
      const myHash = createHash("sha256").update(file).digest("hex");
      console.log(myHash);
    } else {
      console.log("This is not a file");
    }
  } catch (err) {
    throw new Error("Operation failed");
  }
};
