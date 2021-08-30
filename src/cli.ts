#!/usr/bin/env node
import CodeMeta from "./codemeta";
import Cff from "./cff";

const [,, ...args] = process.argv;

const codeMeta = new CodeMeta();

// codeMeta.update("licenseId", "IDFDSFS")
// codeMeta.update("description", "My Cool project")
// codeMeta.update("publisher", "Kalkuta")
// codeMeta.update("readme", "http://gituhub")

// codeMeta.save("./codemeta_2.json");

codeMeta.generateFromNode()


const cff = new Cff();

cff.generateFromCodeMeta();
