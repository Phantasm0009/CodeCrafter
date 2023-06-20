/* configurable global vars */
let MSG_HEADER_FONT = "Verdana, sans-serif";
let MSG_CONTENT_FONT = "Verdana, sans-serif";
let MSG_SUCCESS_COLOUR = "#4caf50";
let MSG_INFO_COLOUR = "#2196F3";
let MSG_WARNING_COLOUR = "#ff9800";
let MSG_ERROR_COLOUR = "#d32f2f";

function mainMsg() {
    return document.getElementById("msg-main");
}

function buildMsg() {
    let divMain = document.createElement("div");
    let divContent = document.createElement("div");
    let divHeader = document.createElement("div");
    let headerIcon = document.createElement("i");
    let h2Title = document.createElement("h2");
    let divBody = document.createElement("div");
    let divFooter = document.createElement("div");
    let btn = document.createElement("button");
    let btnIcon = document.createElement("i");

    divMain.style.display = "none";
    divMain.id = "msg-main";
    divMain.classList.add("msg-main");

    divContent.id = "msg-content";
    divContent.classList.add("msg-content");
    divMain.appendChild(divContent);

    divHeader.id = "msg-header";
    divHeader.classList.add("msg-header");
    divContent.appendChild(divHeader);

    headerIcon.id = "msg-icon";
    headerIcon.classList.add("material-icons", "msg-icon");
    //if installed as Chrome extension
    if(isExtension()) {
        headerIcon.style.paddingTop = "5px";
    }
    // icon.innerHTML = info;
    divHeader.appendChild(headerIcon);

    h2Title.id = "msg-title";
    h2Title.classList.add("msg-title");
    // h2Title.innerHTML = info;
    divHeader.appendChild(h2Title);

    divBody.id = "msg-body";
    divBody.classList.add("msg-body");
    divContent.appendChild(divBody);

    divFooter.id = "msg-footer";
    divFooter.classList.add("msg-footer");
    divContent.appendChild(divFooter);

    btn.id = "msg-close";
    btn.classList.add("msg-close");
    btn.innerHTML = "OK&nbsp;";
    btn.onclick = function() {
        closeMsg();
    };
    divFooter.appendChild(btn);

    btnIcon.classList.add("material-icons");
    btnIcon.innerHTML = "check";
    btn.appendChild(btnIcon);

    document.body.appendChild(divMain);
}

function showMsg(msgType, msgHTML) {
    //validation
    if (typeof msgHTML === 'undefined' || msgHTML === '') {
        return false;
    }

    buildMsg();

    let content = document.getElementById("msg-content");
    let icon = document.getElementById("msg-icon");
    let title = document.getElementById("msg-title");
    let header = document.getElementById("msg-header");
    let footer = document.getElementById("msg-footer");
    let body = document.getElementById("msg-body");
    let btn = document.getElementById("msg-close");

    switch(msgType.toLowerCase()) {
        case "success":
            header.style.backgroundColor = MSG_SUCCESS_COLOUR;
            icon.innerHTML = "check_circle";
            title.innerHTML = "Success!";
            break;
        case "info":
            header.style.backgroundColor = MSG_INFO_COLOUR;
            icon.innerHTML = "info";
            title.innerHTML = "Info";
            break;
        case "warning":
            header.style.backgroundColor = MSG_WARNING_COLOUR;
            icon.innerHTML = "warning";
            title.innerHTML = "Warning!";
            break;
        case "error":
            header.style.backgroundColor = MSG_ERROR_COLOUR;
            icon.innerHTML = "error";
            title.innerHTML = "Error!";
            break;
        default:
            return false;
    }

    header.style.fontFamily = MSG_HEADER_FONT;
    footer.style.fontFamily = MSG_HEADER_FONT;
    btn.style.fontFamily = MSG_HEADER_FONT;
    content.style.fontFamily = MSG_CONTENT_FONT;
    body.innerHTML = msgHTML;

    mainMsg().style.display = "block";
    return true;
}

function closeMsg() {
    mainMsg().style.display = "none";
    mainMsg().remove();
}
