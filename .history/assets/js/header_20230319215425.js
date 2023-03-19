const header = document.querySelector(".header");

function debounceFn(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

window.addEventListener("scroll", function (e) {
    window.requestAnimationFrame(function () {
        const windowTop = window.pageYOffset;
        console.log(windowTop, header.offsetHeight);

        if (windowTop > header.offsetHeight) {
            header.classList.add("stick");
        } else {
            header.classList.remove("stick");
        }
    });
});
