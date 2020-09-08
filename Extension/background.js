chrome.contextMenus.create({
    title: "Stream with Magneto",
    contexts: ["link"],  // ContextType
    onclick: (link, tab) => {
        console.log(link, tab)
        const { linkUrl } = link
        chrome.tabs.create({ 
            url: linkUrl.startsWith("magnet:") 
            ? `magneto://${linkUrl}` 
            : chrome.runtime.getURL("invalid_link.html")
        })
    }
})