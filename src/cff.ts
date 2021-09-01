/* eslint @typescript-eslint/no-var-requires: "off" */

import * as fs from "fs";
import * as yaml from "js-yaml";
import CodeMeta from "./codemeta";

interface Author {
  "family-names"?: string;
  "given-names"?: string;
  orcid?: string;
}

class Cff{
  data: Record<string, any>;

  constructor() {
    switch (true) {
      case fs.existsSync("./CITATION.cff"):
        this.data = yaml.load(fs.readFileSync("./CITATION.cff", "utf8"));
        break;
      case fs.existsSync("./codemeta.json"):
        this.data = yaml.load(fs.readFileSync("./lib/files/CITATION.yml", "utf8"));
        break;
      default:
        this.data = yaml.load(fs.readFileSync("./lib/files/CITATION.yml", "utf8"));
    }
    // this.generateFromCodeMeta()
  }

  get(key: string): Record<string, any> {
    return this.data[key];
  }

  set(key: string, value: Record<string, any>): void {
    this.data[key] = value;
  }

  update(key: string, value: string): void {
    this.data[key] = value;
    fs.writeFileSync("./CITATION.cff", yaml.dump(this.data));
  }

  generateFromCodeMeta(): void {
    const codeMeta = new CodeMeta();
    const data = codeMeta.getData();
    const authors = this.mapAgents(data.agents || data.author || data.contributor);
    this.set("authors", authors || []);
    this.set("title", data.title || "");
    this.set("version", data.version || "");
    this.set("doi", data.identifier || "");
    this.set("date-released", data.datePublished || "");
    this.set("url", data.issueTracker.url || "");
    this.save()
  }


  mapAgents(agents: Array<Author>): Array<Author> {
    const authors = agents.map(this.authorFromAgent)
    return authors
  }

  authorFromAgent(agent: Author): Author {
    const parseFullName = require('parse-full-name').parseFullName;
    const name = parseFullName(agent["name"]);

    const author: Author = {}
    author["family-names"] = name.last
    author["given-names"] = name.first
    author["orcid"] = agent["@id"]
    return author;
  }

  save(): void {
    fs.writeFileSync("./CITATION.cff", yaml.dump(this.data, {forceQuotes: true}), { flag: 'wx' });
  }
}

export default Cff;