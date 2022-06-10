import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { homedir } from "os";
import {
  readFile,
  addFile,
  renameFile,
  copyFile,
  moveFile,
  deleteFile,
} from "./commands/file.js";
import { os } from "./commands/os.js";
import { list } from "./commands/nwd.js";
import { hash } from "./commands/hash.js";
import { compress } from "./commands/compress.js";
import { decompress } from "./commands/decompress.js";
import { currentLocation, invalidInputError } from "./commands/helpers.js";

let username = process.argv.slice(2).toString().replace("--username=", "");
let homeDir = homedir();

const rl = readline.createInterface({ input, output });
console.log(`Welcome to the File Manager, ${username}!`);
currentLocation();

rl.on("line", (result) => {
  const command = result.split(" ")[0];
  const arg1 = result.split(" ")[1];
  const arg2 = result.split(" ")[2];

  switch (command.trim()) {
    case "up":
      if (process.cwd() === homeDir) {
        invalidInputError()
      } else {
        process.chdir("../");
        currentLocation();
      }
      break;
    case "cd":
      try {
        process.chdir(arg1);
        currentLocation();
      } catch {
        invalidInputError()
      }
      break;
    case "ls":
      list(process.cwd());
      break;
    case "cat":
      readFile(arg1);
      currentLocation();
      break;
    case "add":
      addFile(arg1);
      currentLocation();
      break;
    case "rn":
      renameFile(arg1, arg2);
      currentLocation();
      break;
    case "cp":
      copyFile(arg1, arg2);
      currentLocation();
      break;
    case "mv":
      moveFile(arg1, arg2);
      currentLocation();
      break;
    case "rm":
      deleteFile(arg1);
      currentLocation();
      break;
    case "os":
      os(arg1.slice(2));
      break;
    case "hash":
      hash(arg1);
      currentLocation();
      break;
    case "compress":
      compress(arg1, arg2);
      currentLocation();
      break;
    case "decompress":
      decompress(arg1, arg2);
      currentLocation();
      break;
    case ".exit":
      console.log(`Thank you for using File Manager, ${username}!`);
      process.exit();
    default:
      invalidInputError()
  }
});

rl.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${username}!`);
  rl.pause();
});
