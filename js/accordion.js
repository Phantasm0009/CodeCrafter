function setAccordionEvents() {
    let acc = document.getElementsByClassName("accordion-header");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");

            let panel = this.nextElementSibling;

            if (panel.style.maxHeight && panel.style.maxHeight != "") {
                panel.style.maxHeight = null;
            } else {
                if (settings.allowAccordionClick) {
                    closeAllAccordions();
                }

                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}

function setAccordionItemEvents() {
    let acc = document.getElementsByClassName("accordion-item");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            index = getIndexByID(this.dataset.id);
            snippetToScreen();
            saveIndex();
            closeNav();
        });
    }
}

function closeAllAccordions() {
    let panels = document.getElementsByClassName("panel");
    let i;

    for (i = 0; i < panels.length; i++) {
        panels[i].style.maxHeight = null;
    }
}
