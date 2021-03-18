# 🧲 Magneto 
This is a little utility program to make streaming from magnet links into VLC easier. It is composed of **two** parts:
- **A Windows/Mac Desktop Client** that will intercept the *magneto://* custom app protocol and launch peerflix
- A **Chrome extension** that will add a context menu entry on links to forward a magnet url to the desktop application.

## Dependencies
You need VLC installed in order for this to work properly.
- [VLC Media Player](https://www.videolan.org/)
___
## Installation

### macOS Desktop Client
To install the macOS desktop client, download [**MagnetoMacOS.app.zip** from the lastest release](https://github.com/fredericocurti/magneto/releases/tag/v1.1.0), unzip it and move MagnetoMacOS.app to Applications folder.

### Windows Desktop Client
To install the Windows desktop client, download and run [**MagnetoSetup.msi** file from the lastest release](https://github.com/fredericocurti/magneto/releases/tag/v1.1.0).

### Chrome Extension
You can either:
- Install from [**Chrome Web Store**](https://chrome.google.com/webstore/detail/magneto/nagfoodnoinncledhopekanlgglpcfgf)

OR

- Drag and drop the Extension folder into the *chrome://extensions* page with developer mode turned on
___
## Usage
With all prerequisites installed, using it should be as simple as right clicking on a *magnet* link on Chrome, choosing the **🧲 Stream with Magneto** option and click **Open Magneto** on the popup. This should open both a command prompt with the streaming URL and VLC.

<img src="./Extension/ss.png" />

____
### Credits
- Thanks to [Jozef Jaroščiak
](https://github.com/JozefJarosciak) for the great article about custom URI schemes in native Windows apps
- Thanks to [mafintosh](https://github.com/mafintosh) and the other peerflix contributors.
- Thanks to [filipefborba](https://github.com/filipefborba) who helped me testing the program.
