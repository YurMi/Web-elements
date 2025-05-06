(function () {
    const accordionParent = document.querySelectorAll("[data-acc]");
    if (accordionParent.length === 0) return;

    accordionParent.forEach((parent) => {
        //open el [data-acc-content] page is loaded
        const shouldOpen = parent.querySelector("[data-open-acc] [data-acc-content]");
        if (shouldOpen) {
            slideDown(shouldOpen);
        }

        parent.addEventListener("click", function (e) {
            if (parent.getAttribute("data-acc") !== "true") return;
            if (e.target.closest("[data-acc-item]") && !e.target.closest("[data-acc-content]")) {
                const thisAccItem = e.target.closest("[data-acc-item]");
                const content = thisAccItem.querySelector("[data-acc-content]");

                // Open only one accordion at a time
                if (parent.hasAttribute("data-open-one")) {
                    parent.querySelectorAll("[data-acc-item]").forEach((el) => {
                        if (thisAccItem !== el) {
                            el.removeAttribute("data-open-acc");
                            slideUp(el.querySelector("[data-acc-content]"));
                        }
                    });
                    toggleOpen(content);
                    return;
                }

                // Keep one accordion always open
                if (parent.hasAttribute("data-one-always-open")) {
                    if (thisAccItem.closest("[data-open-acc]")) {
                        return;
                    }

                    const el = parent.querySelector("[data-open-acc]");
                    slideUp(el.querySelector("[data-acc-content]"));
                    el.removeAttribute("data-open-acc");
                    toggleOpen(content);
                    return;
                }

                // Open/close multiple accordion items
                toggleOpen(content);
            }
        });
    });

    //Adaptive Accordion
    (function () {
        const accordions = document.querySelectorAll("[data-acc-init-mobile]");
        if (!accordions.length) return;

        accordions.forEach((acc) => {
            const openAccEl = acc.querySelectorAll("[data-acc-title]");
            const dataAccContent = acc.querySelectorAll("[data-acc-content]");

            if (!openAccEl.length || !dataAccContent.length) {
                console.warn("No elements [data-acc-title] or [data-acc-content]");
                return;
            }

            const mediaQuery = window.matchMedia(`(max-width: ${acc.getAttribute("data-acc-init-mobile")})`);
            let dataAccTitleButton = "";
            let once = true;

            function doThisCode() {
                if (mediaQuery.matches) {
                    //mobile
                    acc.setAttribute("data-acc", "true");

                    if (once) {
                        openAccEl.forEach((el) => {
                            const newElement = document.createElement("button");
                            newElement.innerHTML = el.innerHTML;
                            Array.from(el.attributes).forEach((attr) => {
                                newElement.setAttribute(attr.name, attr.value);
                                newElement.setAttribute("type", "button");
                                newElement.setAttribute("title-button", "");
                            });

                            el.insertAdjacentElement("afterend", newElement);
                            el.removeAttribute("data-acc-title");
                        });
                        dataAccTitleButton = acc.querySelectorAll("[title-button]");
                        once = false;
                    }

                    openAccEl.forEach((el) => {
                        el.style.display = "none";
                    });

                    dataAccTitleButton.forEach((el) => (el.style.display = "block"));
                } else {
                    //desktop
                    acc.setAttribute("data-acc", "");

                    openAccEl.forEach((el) => (el.style.display = "block"));
                    dataAccContent.forEach((el) => {
                        if (getComputedStyle(el).display === "none") {
                            el.style.removeProperty("display");
                        }
                    });

                    if (typeof dataAccTitleButton === "object" && dataAccTitleButton.length) {
                        dataAccTitleButton.forEach((el) => (el.style.display = "none"));
                    }
                }
            }

            doThisCode();

            if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", doThisCode);
            else if (mediaQuery.addListener) mediaQuery.addListener(doThisCode);
        });
    })();

    function toggleOpen(el) {
        if (!el.parentElement.hasAttribute("data-open-acc")) {
            slideDown(el);
            el.parentElement.setAttribute("data-open-acc", "");
        } else {
            slideUp(el);
            el.parentElement.removeAttribute("data-open-acc");
        }
    }

    function slideDown(element, duration = 400, easing = "linear") {
        element.style.display = "block";
        let height = element.scrollHeight;
        element.style.height = "0px";
        element.style.overflow = "hidden";

        const easingFunctions = {
            linear: function (t) {
                return t;
            },
            easeIn: function (t) {
                return t * t;
            },
            easeOut: function (t) {
                return t * (2 - t);
            },
            easeInOut: function (t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            },
        };

        let startTime = null;

        function animate(time) {
            if (!startTime) startTime = time;
            let timeElapsed = time - startTime;
            let progress = Math.min(timeElapsed / duration, 1);
            let easeProgress = easingFunctions[easing](progress);

            element.style.height = height * easeProgress + "px";

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.height = "auto";
                element.style.overflow = "";
            }
        }

        requestAnimationFrame(animate);
    }

    function slideUp(element, duration = 400, easing = "linear") {
        // element.style.display = "block"; //fix animation ( if block has display:none )
        let height = element.offsetHeight;
        element.style.height = height + "px";
        element.style.overflow = "hidden";

        const easingFunctions = {
            linear: function (t) {
                return t;
            },
            easeIn: function (t) {
                return t * t;
            },
            easeOut: function (t) {
                return t * (2 - t);
            },
            easeInOut: function (t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            },
        };

        let startTime = null;

        function animate(time) {
            if (!startTime) startTime = time;
            let timeElapsed = time - startTime;
            let progress = Math.min(timeElapsed / duration, 1);
            let easeProgress = easingFunctions[easing](progress);

            element.style.height = height * (1 - easeProgress) + "px";

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = "none";
                element.style.height = "";
                element.style.overflow = "";
            }
        }

        requestAnimationFrame(animate);
    }
})();
