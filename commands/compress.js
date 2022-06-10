import { createBrotliCompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";

export const compress = async (filePath, dest) => {
  const gzip = createBrotliCompress();
  const source = createReadStream(filePath);
  const destination = createWriteStream(dest);

  pipeline(source, gzip, destination, (err) => {
    if (err) {
      throw new Error("Operation failed");
    }
  });
};
