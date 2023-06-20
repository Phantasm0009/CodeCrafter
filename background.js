chrome.runtime.onInstalled.addListener(function() {
    // Open the thank you page after installation
    chrome.tabs.create({ url: chrome.runtime.getURL("thankyou.html") });
  });
  