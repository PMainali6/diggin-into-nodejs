#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const minimist = require("minimist");

const args = minimist(process.argv.slice(2), {
  boolean: ["help", "in"],
  string: ["file"],
});

console.log("args: ", args);

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

if (args.help) {
  console.log("argh...help!!!");
} else if (args.in || args._.includes("-")) {
  processFile(process.stdin);
} else if (args.file) {
  const filePath = path.join(BASE_PATH, args.file);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(err);
    } else {
      processFile(content.toString());
    }
  });
}

function processFile(content) {
  content = content.toUpperCase();
  process.stdout.write(content);
}
