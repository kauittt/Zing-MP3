const navLinks = document.querySelectorAll(".nav h2[data-nav]");
let navSelected = 1;

for (let i = 0; i < [...navLinks].length; i++) {
    const item = navLinks[i];
    item.addEventListener("click", async function (e) {
        navLinks[navSelected].classList.remove("nav-category__item--selected");
        item.classList.add("nav-category__item--selected");
        navSelected = item.dataset.nav;

        switch (navSelected) {
            case "1":
                [...pages].forEach((item) => {
                    item.style.display = "none";
                });

                pages[0].style.display = "block";
                break;
            case "7":
                [...pages].forEach((item) => {
                    item.style.display = "none";
                });

                pages[2].style.display = "block";
                if (!topContent.querySelector(".section-list-item")) {
                    pages[3].style.display = "flex";
                    await loadTop("top100");
                    pages[3].style.display = "none";
                }
                break;
            default:
        }
    });
}
