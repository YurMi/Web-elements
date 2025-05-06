// Mouse scroll cards left/right for PC
function mouseScrollBlock(containerWithCards) {
    let isDragging = false;
    let startX, scrollLeft;

    containerWithCards.addEventListener("mousedown", function (e) {
        isDragging = true;
        startX = e.pageX - containerWithCards.offsetLeft;
        scrollLeft = containerWithCards.scrollLeft;
    });

    containerWithCards.addEventListener("mouseleave", function () {
        isDragging = false;
    });

    containerWithCards.addEventListener("mouseup", function () {
        isDragging = false;
    });

    containerWithCards.addEventListener("mousemove", function (e) {
        if (!isDragging) return;
        let x = e.pageX - containerWithCards.offsetLeft;
        let walk = ((x - startX) * 2) * 0.15;
        containerWithCards.scrollLeft = scrollLeft - walk;
    });
}
