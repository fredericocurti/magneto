chrome.contextMenus.create({
    title: "Stream with Magneto",
    contexts: ["link"],  // ContextType
    onclick: (link) => {
        const { linkUrl } = link
        if (linkUrl.startsWith("magnet:")) {
            chrome.tabs.create({ url: `magneto://${linkUrl}` })
        }
    }
});