#!/usr/bin/env node
import CodeMeta from "./codemeta";
import Cff from "./cff";

const [,, ...args] = process.argv;

switch (args[0]) {
  case "cff":
    const cff = new Cff();
    break;
  case "codemeta":
    const codeMeta = new CodeMeta();
    codeMeta.generateFromNode()
    break;
  default:
  console.log("no input")
    break
}