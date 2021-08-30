import * as fs from "fs";
import * as yaml from "js-yaml";
import CodeMeta from "./codemeta";

class Cff{
  data: any;

  constructor() {
    switch (true) {
      case fs.existsSync("./CITATION.cff"):
        this.data = yaml.load(fs.readFileSync("./CITATION.cff", "utf8"));
        break;
      case fs.existsSync("./codemeta.json"):
        this.data = yaml.load(fs.readFileSync("./lib/files/CITATION.yml", "utf8"));
        this.generateFromCodeMeta()
        break;
      default:
        this.data = yaml.load(fs.readFileSync("./lib/files/CITATION.yml", "utf8"));
        this.generateFromCodeMeta()
    }
  }

  get(key: string) {
    return this.data[key];
  }

  set(key: string, value: string) {
    this.data[key] = value;
  }

  update(key: string, value: string) {
    this.data[key] = value;
    fs.writeFileSync("./CITATION.cff", yaml.dump(this.data));
  }

  generateFromCodeMeta() {
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


  mapAgents(agents){
    const authors = agents.map(this.authorFromAgent)
    return authors
  }

  authorFromAgent(agent){
    var parseFullName = require('parse-full-name').parseFullName;
    const name = parseFullName(agent["name"]);

    const author = {}
    author["orcid"] = agent["@id"]
    author["family-name"] = name.last
    author["give-name"] = name.first
    return author;
  }

  save() {
    fs.writeFileSync("./CITATION.cff", yaml.dump(this.data), { flag: 'wx' });
  }
}

export default Cff;