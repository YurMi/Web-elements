(function () {
    const accordionParent = document.querySelectorAll("[data-acc]");
    if (accordionParent.length === 0) return;

    accordionParent.forEach((parent) => {
        if(parent.querySelector("[data-open-acc] [data-acc-content]")){
			slideDown(parent.querySelector("[data-open-acc] [data-acc-content]"));
		}

        parent.addEventListener("click", function (e) {
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

    function toggleOpen(el) {
        if (!el.parentElement.hasAttribute("data-open-acc")) {
            el.parentElement.setAttribute("data-open-acc", "");
            slideDown(el);
        } else {
            el.parentElement.removeAttribute("data-open-acc");
            slideUp(el);
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
        let height = element.scrollHeight;
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
