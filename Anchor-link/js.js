/*
 Если ссылка такая <a href='#section_id'>
 будет искаться секция с этим id и произойдет скрол до неё.


 Если ссылка будет такая <a href='about_page#section_id'>
 Произойдет редирект на на страницу, затем скрол до нужной секции с ID
*/

function scrollToAnchorSection() {
    if (location.hash) scrollToEl(location.hash, 500);

    document.addEventListener("click", function (e) {
        if (e.target.tagName !== "A") return false;

        if (e.target.getAttribute("href").startsWith("#")) {
            e.preventDefault();
            scrollToEl(e.target.getAttribute("href"), 200);
        }
    });

    function scrollToEl(linkHREF, setTimeOut) {
        const anchorSection = document.querySelector(`${linkHREF}`);
        const headerHeight = document.querySelector(".header").offsetHeight;

        if (anchorSection) {
            setTimeout(function () {
                window.scrollTo({
                    top: anchorSection.offsetTop - headerHeight,
                    behavior: "smooth",
                });
            }, setTimeOut);
            location.hash = "";
        }
    }
}

scrollToAnchorSection();
