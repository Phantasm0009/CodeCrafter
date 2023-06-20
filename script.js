// Copy Button Event Listener
document.getElementById("copyButton").addEventListener("click", function() {
    var extensionLink = "https://chrome.google.com/webstore/detail/codecrafter/mllegkfjonhcfpbkhokboibclmkibdfl";
    navigator.clipboard.writeText(extensionLink)
      .catch(function() {
        console.log("Failed to copy extension link.");
      });
  });