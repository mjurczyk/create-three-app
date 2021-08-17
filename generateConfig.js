const fs = require("fs");
const path = require("path");

// DON'T EDIT OR DELETE THIS FILE. //
let config = {};
function manageDir(directory, json, target = "") {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((file) => {
    if (file.isDirectory()) {
      manageDir(
        path.join(directory, file.name),
        json,
        target + "/" + file.name
      );
      if (!json["dirs"].includes(target + "/" + file.name))
        json["dirs"].push(target + "/" + file.name);
    } else {
      let dir = path.relative(
        path.join(__dirname, "examples"),
        path.join(directory)
      );
      json["files"][file.name] = "./" + dir.split("\\").slice(1).join("/");
    }
  });
}

fs.readdirSync(path.join(__dirname, "examples"), {
  withFileTypes: true,
}).forEach(function (file) {
  if (file.isDirectory()) {
    config[file.name] = { files: {}, dirs: [] };
    return manageDir(
      path.join(__dirname, "examples", file.name),
      config[file.name],
      ""
    );
  }
  return;
});
saveFile(config);
function saveFile(json) {
  fs.writeFileSync("./examples/config.json", JSON.stringify(json));
}
// END OF FILE //