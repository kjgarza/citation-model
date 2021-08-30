import CodeMeta from "../codemeta.js";
import assert from "assert";
import * as json from "./fixtures/codemeta.json";

describe("codemeta", () => {
  it("has a test", () => {
    var meta = new CodeMeta();
    meta.get("licenseId");
    assert(false, "MIT");
  });
});
