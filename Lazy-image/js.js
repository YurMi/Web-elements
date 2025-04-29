export function lazyImage() {
    const images = document.querySelectorAll("span[data-lazy]");
    if (!images.length) return;

    const options = {
        root: null,
        rootMargin: "100px",
        threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentImage = entry.target;
                const replacement = document.createElement("img");
                currentImage.setAttribute("src", currentImage.getAttribute("data-lazy"));
                currentImage.removeAttribute("data-lazy");

                for (let i = 0, l = currentImage.attributes.length; i < l; ++i) {
                    const nodeName = currentImage.attributes.item(i).nodeName;
                    const nodeValue = currentImage.attributes.item(i).nodeValue;

                    replacement.setAttribute(nodeName, nodeValue);
                }

                replacement.innerHTML = currentImage.innerHTML;
                currentImage.parentNode.replaceChild(replacement, currentImage);

                //watch image only once
                observer.unobserve(currentImage);
                observer.unobserve(replacement);
            }
        });
    }, options);

    images.forEach((image) => observer.observe(image));
}
