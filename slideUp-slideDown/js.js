const btn = document.querySelector(".open-content-btn");
btn.addEventListener("click", function () {
    const el = document.querySelector(".open-content");
    slideDown(el);
});

const btnClose = document.querySelector(".close-content-btn");
btnClose.addEventListener("click", function () {
    const el = document.querySelector(".close-content");
    slideUp(el);
});

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
