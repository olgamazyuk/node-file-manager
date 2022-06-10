import {
  createReadStream,
  createWriteStream,
  rename,
  existsSync,
  unlink,
} from "node:fs";
import { copyFile as copy, mkdir } from "fs/promises";

export const readFile = async (pathToFile) => {
  const readStream = createReadStream(pathToFile);
  readStream.on("data", (e) => process.stdout.write(e.toString()));
  readStream.on("error", () => console.log("Operation failed"));
};

export const addFile = async (fileName) => {
  const writeStream = createWriteStream(fileName.toString());
  writeStream.write("");
  writeStream.end();
  writeStream.on("error", () => console.log("Operation failed"));
};

export const renameFile = async (wrongPathToFile, properPathToFile) => {
  rename(wrongPathToFile, properPathToFile, (err) => {
    if (err) console.log("Operation failed");
  });
};

export const copyFile = async (filePath, newDir) => {
  const exists = existsSync(newDir);
  try {
    if (!exists) await mkdir(newDir);
    copy(filePath, `${newDir}/${filePath}`);
  } catch (err) {
    throw new Error("Operation failed");
  }
};

export const moveFile = async (filePath, newDir) => {
  const exists = existsSync(newDir);
  if (!exists) await mkdir(newDir);
  copy(filePath, `${newDir}/${filePath}`);
  unlink(filePath, (err) => {
    if (err) throw new Error("Operation failed");
  });
};

export const deleteFile = async (filePath) => {
  unlink(filePath, (err) => {
    if (err) throw new Error("Operation failed");
  });
};
