(function () {
    if (location.hash) {
        scrollToEl(location.hash, 500);
    }

    document.addEventListener("click", function (e) {
        if (e.target.tagName !== "A") return false;

        if (e.target.getAttribute("href").startsWith("#")) {
            e.preventDefault();
            scrollToEl(e.target.getAttribute("href"), 200);
        }
    });

    function scrollToEl(linkHREF, setTimeOut = 400) {
        const anchorSection = typeof linkHREF === "object" ? linkHREF : document.querySelector(`${linkHREF}`);
        const headerHeight = document.querySelector(".header")?.offsetHeight || 100;

        if (anchorSection) {
            setTimeout(function () {
                const offsetTop = anchorSection.getBoundingClientRect().top + window.scrollY - headerHeight - 100;

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                });
            }, setTimeOut);
        }
    }
})();
