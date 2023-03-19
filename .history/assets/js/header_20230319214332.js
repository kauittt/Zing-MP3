const header = document.querySelector(".header");

window.addEventListener("wheel", function (e) {
    const windowTop = window.pageYOffset;
    console.log(windowTop, header.offsetHeight);

    if (windowTop > header.offsetHeight) {
        header.classList.add("stick");
    } else {
        header.classList.remove("stick");
    }
});
