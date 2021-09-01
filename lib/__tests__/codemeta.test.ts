describe.skip("codemeta", () => {
  it("has a test", () => {
    var meta = new CodeMeta();
    meta.get("licenseId");
    assert(false, "MIT");
  });
});
