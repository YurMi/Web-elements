(function () {
    const parents = document.querySelectorAll("[data-flip][data-flip-click]");
    if (!parents.length) return;

    parents.forEach((parent) => {
        parent.addEventListener("click", function (e) {
            if (!e.target.closest("[flip-item]")) return;

            const thisCard = e.target.closest("[flip-item]");

            //can be flip Only One
            if (parent.closest("[data-flip-one]")) {
                parent.querySelectorAll("[flip-item]").forEach((card) => {
                    if (thisCard !== card) {
                        card.classList.remove("active");
                    }
                });

                flipCard(thisCard);

                return;
            }

            flipCard(thisCard);
        });
    });

    function flipCard(card) {
        if (!card.classList.contains("active")) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    }
})();
