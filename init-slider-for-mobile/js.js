/**
 * Activates a Swiper slider on mobile devices.
 *
 * @param {string} el - The container element for the slider.
 * @param {string} breakpoint - The viewport width (in px) below which the slider is activated.
 * @param {Object} [sliderOptions={}] - Additional Swiper configuration options.
 * @param {boolean | 'remove'} [defaultArrows=true] - Controls the default navigation arrows:
 *   - `true` (default): Add default navigation arrows.
 *   - `false`: Use arrows position outside the Swiper wrapper in the block. <button class="swiper-prev">Prevent</button><button class="swiper-next">Next</button>
 *   - `'remove'`: Off arrows.
 * @param {boolean | 'remove'} [defaultPagination=true] - Controls the default pagination:
 *   - `true` (default): Add default pagination.
 *   - `false`: Use pagination position outside the Swiper wrapper in the block. <div class="swiper-pagination"></div>
 *   - `'remove'`: Off pagination.
 */
function activateSliderOnMobile(el, breakpoint, sliderOptions = {}, defaultArrows = true, defaultPagination = true) {
    const sliders = document.querySelectorAll(`${el}`);
    if (!sliders.length) return;

    sliders.forEach(function (sliderEl) {
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`);
        let sliderSwiper = "";

        function windowSizeIsChange() {
            if (mediaQuery.matches) {
                //mobile activate slider
                activateSlider();
            } else {
                //desktop remove slider
                unActivateSlider();
            }
        }

        windowSizeIsChange();

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", () => windowSizeIsChange());
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(() => windowSizeIsChange());
        }

        function activateSlider() {
            sliderEl.classList.add("swiper");
            [...sliderEl.children].forEach((childSlide) => childSlide.classList.add("swiper-slide"));
            sliderEl.innerHTML = `<div class="swiper-wrapper">${sliderEl.innerHTML}</div>`;

            sliderSwiper = new Swiper(sliderEl, {
                init: false,
                // modules: [Navigation, Pagination, Autoplay], //on if Modules
                speed: 600,
                ...sliderOptions,
            });

            sliderSwiper.on("init", function () {
                //arrows
                (function () {
                    if (defaultArrows === "remove") return;

                    if (defaultArrows) {
                        const arrows = `
                            <button class="swiper-button-prev"></button>
                            <button class="swiper-button-next"></button>`;

                        sliderEl.insertAdjacentHTML("beforeend", arrows);

                        sliderSwiper.params.navigation = {
                            ...sliderSwiper.params.navigation,
                            prevEl: sliderEl.querySelector(".swiper-button-prev"),
                            nextEl: sliderEl.querySelector(".swiper-button-next"),
                        };
                    } else {
                        const prevButton = sliderEl.closest("section").querySelector(".swiper-prev");
                        const nextButton = sliderEl.closest("section").querySelector(".swiper-next");

                        sliderSwiper.params.navigation = {
                            ...sliderSwiper.params.navigation,
                            prevEl: prevButton,
                            nextEl: nextButton,
                        };

                        prevButton.style.display = "block";
                        nextButton.style.display = "block";
                    }

                    sliderSwiper.navigation.init();
                    sliderSwiper.navigation.update();
                })();

                //pagination
                (function () {
                    if (defaultPagination === "remove") return;

                    if (defaultPagination) {
                        sliderEl.insertAdjacentHTML("beforeend", `<div class="swiper-pagination"></div>`);
                        sliderSwiper.params.pagination = {
                            ...sliderSwiper.params.pagination,
                            el: sliderEl.querySelector(".swiper-pagination"),
                            type: "bullets",
                            clickable: true,
                            bulletElement: "button",
                        };
                    } else {
                        const pagination = sliderEl.closest("section").querySelector(".swiper-pagination");
                        sliderSwiper.params.pagination = {
                            ...sliderSwiper.params.pagination,
                            el: pagination,
                            bulletElement: "button",
                        };

                        pagination.style.display = "block";
                        pagination.style.position = "static";
                    }

                    sliderSwiper.pagination.init();
                    sliderSwiper.pagination.render();
                    sliderSwiper.pagination.update();
                })();
            });

            sliderSwiper.init();
        }

        function unActivateSlider() {
            const isActivatedSlider = typeof sliderSwiper === "object";

            if (isActivatedSlider) {
                sliderSwiper.destroy(false);
                sliderEl.classList.remove("swiper");

                const wrapper = sliderEl.querySelector(".swiper-wrapper");
                while (wrapper.firstChild) {
                    sliderEl.appendChild(wrapper.firstChild);
                }
                wrapper.remove();
            }

            //arrows
            (function () {
                if (defaultArrows === "remove") return;
                if (defaultArrows === true && isActivatedSlider) {
                    sliderEl.querySelector(".swiper-button-prev").remove();
                    sliderEl.querySelector(".swiper-button-next").remove();
                } else {
                    const prevButton = sliderEl.closest("section").querySelector(".swiper-prev");
                    const nextButton = sliderEl.closest("section").querySelector(".swiper-next");

                    if (prevButton && nextButton) {
                        sliderEl.closest("section").querySelector(".swiper-prev").style.display = "none";
                        sliderEl.closest("section").querySelector(".swiper-next").style.display = "none";
                    }
                }
            })();

            //pagination
            (function () {
                if (defaultPagination === "remove") return;

                if (defaultPagination === true && isActivatedSlider) {
                    sliderEl.querySelector(".swiper-pagination").remove();
                } else {
                    const pagination = sliderEl.closest("section").querySelector(".swiper-pagination");
                    if (pagination) {
                        pagination.style.display = "none";
                    }
                }
            })();

            sliderEl.querySelectorAll(".swiper-slide").forEach((el) => el.classList.remove("swiper-slide"));
        }
    });
}

activateSliderOnMobile(
    ".slider-on-mobile",
    "767px",
    {
        spaceBetween: "24px",
    },
    true,
    "remove"
);
