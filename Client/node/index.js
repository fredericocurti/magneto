// @ts-check
const process = require("process");
const child_process = require("child_process");
const path = require("path");
const SysTray = require("systray2").default;
const fs = require("fs");
const alert = require("alert");

const logo = fs.readFileSync(path.join(__dirname, "icon.ico"), {
  encoding: "base64",
});

let link;
let output;

/** @type {import("child_process").ChildProcess} */
let child;

const releaseTrayBin = path.join(
  __dirname,
  "node_modules/systray2/traybin/tray_windows_release.exe"
);
const releaseTrayBinDarwin = path.join(
  __dirname,
  "node_modules/systray2/traybin/tray_darwin_release"
);

try {
  link = process.argv[2].replace("magneto://magnet:/?", "magnet:?");
  link = process.argv[2].replace("magneto://magnet:?", "magnet:?");
} catch (error) {
  console.log("Please run Magneto from the Chrome extension");
  process.exit(1);
}

const appPath = path.join(__dirname, "node_modules/peerflix/app.js");

const systray = new SysTray({
  menu: {
    icon: logo,
    title: process.platform === "darwin" ? "" : "Streaming with Magneto",
    tooltip: "Magneto",
    items: [
      {
        title: "Loading",
        tooltip: "",
        checked: false,
        enabled: false,
      },
      {
        title: "",
        tooltip: "",
        checked: false,
        enabled: false,
      },
      {
        title: "Exit",
        tooltip: "bb",
        checked: false,
        enabled: true,
      },
    ],
  },
  copyDir: path.join(path.dirname(process.execPath), "traybin"),
});

child = child_process.fork(
  appPath,
  [link, "--vlc", "--", "--no-video-on-top"],
  { stdio: "pipe", silent: true, detached: true }
);

child.addListener("close", (code) => {
  if (systray) {
    systray.kill();
  }
  process.exit(0);
});

systray.onClick((action) => {
  if (action.seq_id === 2) {
    if (child) {
      child.kill("SIGTERM");
    }
    systray.kill();
  }
});

child.stdout.addListener("data", (data) => {
  output = String(data)
    .replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
    )
    .replace(/  +/g, "")
    .split("\n")
    .filter((line) => line.startsWith("info"));
  if (output.length === 0) return;

  const [firstLine] = output;

  if (firstLine.startsWith("info streaming") && systray) {
    const fileNameAndDownloadRate = firstLine.slice(
      15,
      firstLine.lastIndexOf("/s from") + 2
    );
    systray.sendAction({
      type: "update-item",
      item: {
        title: fileNameAndDownloadRate,
      },
      seq_id: 0,
    });
  }

  if (firstLine.startsWith("info downloaded") && systray) {
    const fileNameAndDownloadRate = firstLine.slice(
      5,
      firstLine.lastIndexOf(")") + 1
    );
    systray.sendAction({
      type: "update-item",
      item: {
        title: capitalizeFirstLetter(fileNameAndDownloadRate),
      },
      seq_id: 1,
    });
  }
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
