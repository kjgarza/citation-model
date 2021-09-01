import * as fs from "fs";
import * as yaml from "js-yaml";

class Package{
  data: any;

  constructor(type?: string) {

    switch (type) {
      case "ruby":
        this.data = yaml.load(fs.readFileSync("./CITATION.cff", "utf8"));
        break;
      case "python":
        break;
      case "node":
        this.data = JSON.parse(fs.readFileSync("./package.json", "utf8"));
        break;
      case "debian":
        break;
      case "r":
        break;
      case "maven":
        break;
      default:
        break;
    }

  }

  get(key: string): any {
    return this.data[key];
  }
  
  getData(): Record<string, any> {
    return this.data;
  }

  set(key: string, value: Record<string, any>): void {
    this.data[key] = value;
  }
}

export default Package;