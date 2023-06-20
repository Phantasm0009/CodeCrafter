function isExtension() {
    const ext = "chrome-extension://";
    let url = window.location.href;

    return url.includes(ext);
    //url.substring(0, 19) == ext;
}
