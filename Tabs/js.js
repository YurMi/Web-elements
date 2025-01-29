//Tabs ======
(function () {
    const tabParent = document.querySelectorAll("[data-tabs]");
    if (!tabParent.length) return;

    tabParent.forEach((parent) => {
        const buttons = parent.querySelectorAll("[tab-link]");
        const tabContent = parent.querySelectorAll("[tab-content]");

        //page is load, close all tabs content
        closeTabs(tabContent);
        let firstActiveTabFound = false;

        buttons.forEach((button) => {
            //page is load, open active Tab
            if (!firstActiveTabFound && !button.classList.contains("hide_team_member")) {
                button.classList.add("active-tab-button");
                const activeTabContent = parent.querySelector(`[tab-content='${button.getAttribute("tab-link")}']`);
                activeTabContent.classList.add("active-tab-content");
                firstActiveTabFound = true;
            }

            button.addEventListener("click", function () {
                const activeTabContent = parent.querySelector(`[tab-content='${button.getAttribute("tab-link")}']`);

                buttons.forEach((item) => {
                    item.classList.remove("active-tab-button");
                });

                closeTabs(tabContent);

                //open active Tab
                this.classList.add("active-tab-button");
                activeTabContent.classList.add("active-tab-content");
            });
        });
    });

    function closeTabs(items) {
        items.forEach((item) => {
            item.classList.remove("active-tab-content");
        });
    }
})();
