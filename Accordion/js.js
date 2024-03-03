function myAccordion() {
    const accordionParent = document.querySelectorAll("[data-acc]");
    if (accordionParent.length === 0) return;
    accordionParent.forEach((parent) => {
        const accordionContentBlock = parent.querySelectorAll("[data-acc-content]");

        //set current max-height
        accordionContentBlock.forEach((element) => {
            setTimeout(() => {
                element.style.setProperty("--jsHeight", `${element.offsetHeight}px`);
                element.setAttribute("data-height", `${element.offsetHeight}px`);
                element.style.maxHeight = "0";
            }, 200);
        });

        //just one tab can be open
        if (parent.hasAttribute("data-open-one")) {
            parent.addEventListener("click", function (e) {
                if (e.target.closest("details")) {
                    const thisDetailsButton = e.target.closest("details");

                    if (thisDetailsButton.hasAttribute("open")) {
                        e.preventDefault();
                        thisDetailsButton.removeAttribute("open");
                    }

                    parent.querySelectorAll("[open]").forEach((el) => {
                        el.removeAttribute("open");
                    });
                }
            });
        }

        parent.addEventListener("click", function (e) {
            if (e.target.closest("details")) {
                const thisDetailsButton = e.target.closest("details");

                if (!thisDetailsButton.hasAttribute("open")) {
                    parent.querySelector("[data-acc-content]").style.maxHeight = "0";
                }
            }
        });
    });
}
myAccordion();
