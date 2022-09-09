import { readdir } from "node:fs";

export const list = async (dirname) => {
  readdir(dirname, (err, files) => {
    if (err) throw new Error("Operation failed");
    console.log(files.join("\r\n"));
  });
};