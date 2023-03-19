const header = document.querySelector(".header");

window.addEventListener("wheel", function (e) {
    const windowTop = window.pageYOffset;

    if (windowTop > header.offsetHeight) {
        console.log(windowTop, header.offsetHeight);
        header.classList.add("stick");
    } else {
        header.classList.remove("stick");
    }
});
