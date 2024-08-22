#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const Transform = require("stream").Transform;
const zlib = require("zlib");

const minimist = require("minimist");

const args = minimist(process.argv.slice(2), {
  boolean: ["help", "in", "out", "compress", "uncompress"],
  string: ["file"],
});

console.log("args: ", args);

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

let OUT_FILE = path.join(BASE_PATH, "out.txt");

if (args.help) {
  console.log("argh...help!!!");
} else if (args.in || args._.includes("-")) {
  processFile(process.stdin);
} else if (args.file) {
  const filePath = path.join(BASE_PATH, args.file);
  let stream = fs.createReadStream(filePath);

  processFile(stream);
}

function processFile(inputStream) {
  let stream = inputStream;
  const outStream = args.out ? process.stdout : fs.createWriteStream(OUT_FILE);

  if (args.uncompress) {
    const uncompressStream = zlib.createGunzip();
    stream = stream.pipe(uncompressStream);
  }

  // transformation
  const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().toUpperCase());
      // setTimeout(cb, 500);
      callback();
    },
  });

  stream = stream.pipe(upperCaseTransform);

  if (args.compress) {
    OUT_FILE = `${OUT_FILE}.gz`;
    const gzip = zlib.createGzip();
    stream = stream.pipe(gzip);
  }
  stream.pipe(outStream);
}
