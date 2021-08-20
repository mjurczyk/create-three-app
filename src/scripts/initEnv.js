const chalk = require("chalk");
const spawn = require("cross-spawn");
const path = require("path");
const { error } = require("./utils");

let dir = process.argv[2] || "my-three-app";

async function installDeps(manager, isExample) {
  console.log(
    chalk.dim(chalk.green(`Installing dependencies using ${manager}..!`))
  );
  spawn(manager === "npm" ? "npm" : "yarn", ["install"], {
    stdio: "inherit",
    cwd: path.join(process.cwd(), dir),
  })
    .on("close", () => {
      console.clear();
      console.log(chalk.green("Dependencies installed..!"));
      console.clear();
      console.log(
        `${chalk.cyanBright(`\n\n    cd `)}${chalk.yellowBright(dir)}\n`,
        chalk.dim(
          `   ${chalk.cyanBright(
            `${manager === "yarn" ? "yarn" : "npm run"} `
          )}${chalk.yellowBright("dev")}\n`
        )
      );
      console.log(
        chalk.dim(
          `\nDon't forget to run ${chalk.green(
            `${manager === "yarn" ? "yarn" : "npm run"} build`
          )} for production\n`
        )
      );
      if (isExample)
        console.log(
          chalk.yellowBright(
            "You can find some info about assets in assets.json"
          )
        );
    })
    .on("error", (e) => {
      error(e.message);
    });
}

const init = (answer, isExample = false) => {
  spawn("npm", ["init", "-y"], {
    cwd: path.join(process.cwd(), dir),
  })
    .on("exit", () => {
      installDeps(answer, isExample);
    })
    .on("error", (e) => {
      error(e);
    });
};

module.exports = init;
