(function () {
    const accordionParent = document.querySelectorAll("[data-acc]");
    if (accordionParent.length === 0) return;

    accordionParent.forEach((parent) => {
        const accordionContentBlock = parent.querySelectorAll("[data-acc-content]");

        //set current max-height
        accordionContentBlock.forEach((element) => {
            setTimeout(() => {
                element.style.setProperty("--jsHeight", `${element.offsetHeight}px`);
                element.style.maxHeight = "0";
            }, 200);
        });

        parent.addEventListener("click", function (e) {
            if (e.target.closest("[data-acc-item]")) {
                const thisAccItem = e.target.closest("[data-acc-item]");

                //can be open just One Accordion
                if (parent.hasAttribute("data-open-one")) {
                    parent.querySelectorAll("[data-acc-item]").forEach((el) => {
                        if (thisAccItem !== el) {
                            el.removeAttribute("data-open-acc");
                        }
                    });

                    toggleOpen(thisAccItem);
                    return;
                }

                //should be open One Accordion 'Always'
                if (parent.hasAttribute("data-one-always-open")) {
                    parent.querySelectorAll("[data-acc-item]").forEach((el) => {
                        el.removeAttribute("data-open-acc");
                    });

                    toggleOpen(thisAccItem);
                    return;
                }

                //Ca be open/close all Accordion Items
                toggleOpen(thisAccItem);
            }
        });
    });

    function toggleOpen(el) {
        if (!el.hasAttribute("data-open-acc")) {
            el.setAttribute("data-open-acc", "");
        } else {
            el.removeAttribute("data-open-acc");
        }
    }
})();
