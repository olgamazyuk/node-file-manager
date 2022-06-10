import { createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";

export const decompress = async (filePath, dest) => {
  const unzip = createBrotliDecompress();
  const input = createReadStream(filePath);
  const output = createWriteStream(dest);

  pipeline(input, unzip, output, (err) => {
    if (err) {
      console.error("An error occurred:", err);
      process.exitCode = 1;
    }
  });
};
