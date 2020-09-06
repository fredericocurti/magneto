// @ts-check
const process = require("process")
const child_process = require("child_process");
const peerflix = require("peerflix")
const path = require("path")

let link

try {
    link = process.argv[2].replace("magneto://magnet:/?", "magnet:?");
} catch (error) {
    console.log("Please run Magneto from the Chrome extension")
    process.exit(1)
}

const appPath = path.join(__dirname , "node_modules/peerflix/app.js")
child_process.fork(
    appPath,
    [link, "-q", "--vlc", "--", "--no-video-on-top"]
)