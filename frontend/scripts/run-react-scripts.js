const { spawn, spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const script = process.argv[2];

if (!script) {
  console.error("Usage: node scripts/run-react-scripts.js <start|build|test|eject>");
  process.exit(1);
}

const projectRoot = path.resolve(__dirname, "..");
const reactScriptsBin = path.join(projectRoot, "node_modules", "react-scripts", "bin", "react-scripts.js");

if (!fs.existsSync(reactScriptsBin)) {
  console.error("react-scripts is not installed. Run npm install first.");
  process.exit(1);
}

if (process.platform !== "win32" || !projectRoot.includes("!")) {
  const child = spawn(process.execPath, [reactScriptsBin, script], {
    cwd: projectRoot,
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 0);
  });

  return;
}

function findFreeDriveLetter() {
  for (let code = "Z".charCodeAt(0); code >= "P".charCodeAt(0); code -= 1) {
    const letter = String.fromCharCode(code);
    if (!fs.existsSync(`${letter}:\\`)) {
      return `${letter}:`;
    }
  }

  throw new Error("No free drive letters available for subst.");
}

const drive = findFreeDriveLetter();
const substCreate = spawnSync("subst", [drive, projectRoot], { stdio: "inherit" });

if (substCreate.status !== 0) {
  process.exit(substCreate.status ?? 1);
}

const mappedRoot = `${drive}\\`;
const child = spawn(process.execPath, [path.join(mappedRoot, "node_modules", "react-scripts", "bin", "react-scripts.js"), script], {
  cwd: mappedRoot,
  stdio: "inherit",
  env: process.env,
});

let cleanedUp = false;

function cleanup() {
  if (cleanedUp) {
    return;
  }

  cleanedUp = true;
  spawnSync("subst", [drive, "/D"], { stdio: "inherit" });
}

process.on("SIGINT", () => {
  cleanup();
  child.kill("SIGINT");
});

process.on("SIGTERM", () => {
  cleanup();
  child.kill("SIGTERM");
});

child.on("exit", (code, signal) => {
  cleanup();

  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
