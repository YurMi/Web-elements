/**
 * MoveElementFromToByMediaQuery
 *
 * Dynamically moves an element from one parent container to another
 * depending on the specified CSS media query.
 *
 * @example
 * Example 1: move .box to .mobile container at the start
 * new MoveElementFromToByMediaQuery({
 *   section: document.querySelector(".test"),
 *   element: ".box",
 *   from: ".desktop",
 *   to: ".mobile",
 *   targetPosition: "first" || "last",
 *   mediaQuery: "(max-width: 992px)"
 * });
 *
 * @example
 * Example 2: move .box after .line element inside .mobile
 * new MoveElementFromToByMediaQuery({
 *   section: document.querySelector(".test"),
 *   element: ".box",
 *   from: ".desktop",
 *   to: ".mobile",
 *   targetPosition: ["before", ".selector"] || ["after", ".selector"]
 * });
 */
class MoveElementFromToByMediaQuery {
    /**
     * @param {Object} options - Configuration options
     * @param {HTMLElement} options.section - Root section where containers are located
     * @param {string} [options.element=".box"] - Selector of the element to move
     * @param {string} [options.from=".desktop"] - Selector of the source container
     * @param {string} [options.to=".mobile"] - Selector of the target container
     * @param {string} [options.mediaQuery="(max-width: 992px)"] - CSS media query for movement
     * @param {("first"|"last"|Array)} [options.targetPosition="last"] -
     * Defines where inside the target container the element will be inserted:
     *   - `"first"` → insert as the first child
     *   - `"last"` → insert as the last child
     *   - `["before", ".selector"]` → insert before element matching selector
     *   - `["after", ".selector"]` → insert after element matching selector
     */
    constructor(options = {}) {
        this.options = Object.assign(
            {
                section: "",
                element: ".box",
                from: ".desktop",
                to: ".mobile",
                mediaQuery: "(max-width: 992px)",
                targetPosition: "last",
            },
            options
        );

        this.section = this.options.section;
        if (!this.section) {
            console.warn("MoveElementFromToByMediaQuery: section not provided.");
            return;
        }

        this.element = this.section.querySelector(this.options.element);
        this.from = this.section.querySelector(this.options.from);
        this.to = this.section.querySelector(this.options.to);

        if (!this.element) {
            console.warn("MoveElementFromToByMediaQuery: element not found:", this.options.element);
            return;
        }
        if (!this.from) {
            console.warn("MoveElementFromToByMediaQuery: from container not found:", this.options.from);
            return;
        }
        if (!this.to) {
            console.warn("MoveElementFromToByMediaQuery: to container not found:", this.options.to);
            return;
        }

        this.mediaQuery = this.options.mediaQuery;
        this.targetPosition = this.options.targetPosition;

        this.init();
    }

    /**
     * Moves element into target container based on targetPosition
     */
    moveToTarget() {
        if (this.targetPosition === "first") {
            this.to.insertBefore(this.element, this.to.firstElementChild || null);
        } else if (this.targetPosition === "last") {
            this.to.appendChild(this.element);
        } else if (Array.isArray(this.targetPosition)) {
            const [mode, selector] = this.targetPosition;
            const target = this.to.querySelector(selector);

            if (target) {
                if (mode === "before") {
                    this.to.insertBefore(this.element, target);
                } else if (mode === "after") {
                    this.to.insertBefore(this.element, target.nextSibling);
                } else {
                    console.warn("MoveElementFromToByMediaQuery: unknown mode in targetPosition:", mode);
                    this.to.appendChild(this.element);
                }
            } else {
                console.warn("MoveElementFromToByMediaQuery: selector not found in targetPosition:", selector);
                this.to.appendChild(this.element);
            }
        } else {
            console.warn("MoveElementFromToByMediaQuery: invalid targetPosition, fallback to 'last'");
            this.to.appendChild(this.element);
        }
    }

    /**
     * Initializes event listeners and handles element moving
     */
    init() {
        const elementChildrenStartPosition = Array.from(this.from.children).indexOf(this.element);
        const mediaQuery = window.matchMedia(this.mediaQuery);

        const checkWindowSize = () => {
            if (mediaQuery.matches) {
                this.moveToTarget();
            } else {
                if (elementChildrenStartPosition >= this.from.children.length) {
                    this.from.appendChild(this.element);
                } else {
                    this.from.insertBefore(this.element, this.from.children[elementChildrenStartPosition] || null);
                }
            }
        };

        checkWindowSize();

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", checkWindowSize);
        } else {
            mediaQuery.addListener(checkWindowSize);
        }
    }
}

/*

 const sections = document.querySelectorAll(".test");
 sections.forEach((section) => {
     new MoveElementFromToByMediaQuery({
         section: section,
         element: ".box",
         from: ".desktop",
         to: ".mobile",
         targetPosition: ["after", ".line"],
     });
 });
 
 */
