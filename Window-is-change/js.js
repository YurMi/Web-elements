/*
    Способ слушать ширину экрана,
    не так сильно нагружается железо компа и телефона
    код сработает только после пересечения нужной ширины экрана.
    Так же здесь идёт поддержка старых браузеров (iphone 8)
*/
document.addEventListener("DOMContentLoaded", function () {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    //your code write here
    function doThisCode() {
        if (mediaQuery.matches) {
            console.log(true);
        } else {
            console.log(false);
        }
    }

    //Document is loaded
    doThisCode();

    //Window size is change
    if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", doThisCode);
    else if (mediaQuery.addListener) mediaQuery.addListener(doThisCode);
});
