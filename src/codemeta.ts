import * as fs from "fs";
import Package from "./package";


interface Author {
  'family-names'?: string;
  'given-names'?: string;
  orcid?: string;
  name?: string;
  email?: string;
}

class CodeMeta{
  data: any;

  constructor() {
    switch (true) {
      case fs.existsSync("./codemeta.json"):
        this.data = JSON.parse(fs.readFileSync("./codemeta.json", "utf8"));
        break;
      default:
        this.data = JSON.parse(fs.readFileSync("./templates/codemeta.json", "utf8"));
    }
  }

  get(key: string): any {
    return this.data[key];
  }
  
  getData(): Record<string, any>{
    return this.data;
  }

  set(key: string, value: Record<string, any>): void {
    this.data[key] = value;
  }

  update(key: string, value: Record<string, any>): void {
    this.data[key] = value;
    fs.writeFileSync("./codemeta.json", JSON.stringify(this.data, null, 2));
  }

  save(): void {
    fs.writeFileSync("./codemeta.json", JSON.stringify(this.data, null, 2));
  }

  addAuthor(author:  Author):  void{
    const authors = this.get("author");
    this.set("author", authors.push(author));
  }

  generateFromNode(): void  {
    const node = new Package("node");
    const data = node.getData();

    this.set("codeRepository",data.repository || "");
    this.set("operatingSystem",	data.os || "");
    this.set("processorRequirements",	data.cpu || data.engines || "");
    this.set("softwareRequirements",	data.dependencies || data.bundledDependencies || data.peerDependencies || "");
    this.set("author",	data.author || []);
    this.set("contributor",	data.contributor || []);
    this.set("creator",	data.author || "");
    this.set("keywords",	data.keywords || "");
    this.set("license",	data.license || "");
    this.set("version", 	data.version || "");
    this.set("description",	data.description || "");
    this.set("identifier", data.name || "");
    this.set("name",	data.name || "");
    this.set("title",	data.name || "");
    this.set("email",	data.author.email || "");
    this.set("name", data.author.name || "");
    this.set("softwareSuggestions",	data.devDependencies || data.optionalDependencies || "");
    this.set("issueTracker", data.bugs || "");
    this.save()
  }

  generatefromGemset(): void  {
   const gemset = new Package("ruby");
    const data = gemset.getData();

    this.set("codeRepository", data.homepage || "");
    this.set("runtimePlatform", data.platform || "");
    this.set("softwareRequirements", data.requirements || data.add_runtime_dependency || "");
    this.set("author", data.author || []);
    this.set("license", data.license || data.licenses || "");
    this.set("version", data.version || "");
    this.set("description", data.summary || data.description || "");
    this.set("name", data.name || "");
    this.set("email", data.email || "");
    this.set("softwareSuggestions", data.add_development_dependency || "");
    this.save()
  }

  generatefromGithub(): void {
    const github = new Package("github");
    const data = github.getData();

    this.set("codeRepository",	data.html_url || ""); 
    this.set("programmingLanguage", data.languages_url || ""); 
    this.set("downloadUrl", data.archive_url || ""); 
    this.set("author", data.login || []); 
    this.set("dateCreated", data.created_at || ""); 
    this.set("dateModified", data.updated_at || ""); 
    this.set("license", data.license || ""); 
    this.set("description", data.description || ""); 
    this.set("identifier", data.id || ""); 
    this.set("name", data.full_name || ""); 
    this.set("issueTracker", data.issues_url || ""); 

    this.save()
  }
}

export default CodeMeta;